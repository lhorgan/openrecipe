//const BASE_URL = "https://recipe-server-4550.herokuapp.com";
const BASE_URL = "http://localhost:8080";

const EDHOST = "https://api.edamam.com";
const USHOST = BASE_URL;
const APP_ID = "9e5dbffd";
const APP_KEY = "7a87790bd58b4773a7936914a67cb03b";

let _singleton = Symbol();

export default class RecipeService {
    constructor(singletonToken) {
      //console.log(process.env);
      if (_singleton !== singletonToken)
        throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
      if(!this[_singleton])
        this[_singleton] = new RecipeService(_singleton);
      return this[_singleton]
    }

    createRecipe(recipe, userId) {
      console.log("creating recipe...");
      console.log(recipe);
      let recipeCopy = JSON.parse(JSON.stringify(recipe));
      if(recipeCopy.ingredients) {
        recipeCopy.ingredients = recipeCopy.ingredients.map(ingredient => {
          return {"quantity": ingredient.quantity, "food": {"label": ingredient.food}, "measure": {"label": ingredient.measure}};
        });
      }

      return fetch(BASE_URL + "/api/recipe/create", {
        method: "POST",
        body: JSON.stringify(recipeCopy),
        headers: {
          'Content-Type' : 'application/json'
        },
        credentials: 'include'
      }).then((response) => {
        return response.json();
      }).catch((error) => {
        console.error("ERROR in create recipe");
        console.error(error);
      });
    }

    searchEdamam(query) {
      let url = EDHOST + "/search?q=" + query
                       + "&app_id=" + APP_ID
                       + "&app_key=" + APP_KEY;

      return fetch(url, {}).then((response) => {
        return response.json();
      })
      .then(recipes => {
        console.log(recipes);
        return recipes;
      })
      .catch((error) => {
        console.error("Fetch from Edamam failed");
        console.error(error);
        return [];
      });
    }

    search(query, page) {
      console.log("THE QUERY: " + query);
      let url = BASE_URL + "/api/recipe/search/" + query + "/page/" + 1;
      return fetch(url, {})
             .then(response => response.json())
             .then(recipes => {
               console.log(recipes);
               return {"hits": recipes.map(recipe => {
                 recipe.ingredients = recipe.ingredients.map(ingredient => {
                   return {...ingredient, "text": ingredient.quantity + " " + ingredient.measure.label + " " + ingredient.food.label};
                 });
                 return {"recipe": recipe}
               })};
             })
             .then(recipeList => {
               return this.searchEdamam(query)
                          .then(edamamRecipes => {
                            edamamRecipes.hits = recipeList.hits.concat(edamamRecipes.hits);
                            return edamamRecipes;
                          });
             });
    }

    getRecipe(uri) {
      let url = EDHOST + "/search?r=" + encodeURIComponent(uri)
                       + "&app_id=" + APP_ID
                       + "&app_key=" + APP_KEY;

      return fetch(url, {}).then((response) => {
        return response.json();
      })
      .then(recipe => {
        //alert(JSON.stringify(recipe[0]));
        return recipe[0];
      })
      .catch((error) => {
        console.error("Fetch from Edamam failed");
        console.error(error);
        return null;
      });
    }

    addReview(recipeId, recipeURI, review) {
      let reviewObj = {"review": review};
      if(recipeId) {
        console.log("adding a review the normal way now...");
        let url = BASE_URL + "/api/review/id/" + recipeId;
        return fetch(url, {
          method: "POST",
          body: JSON.stringify(reviewObj),
          headers: {
            'Content-Type' : 'application/json'
          },
          credentials: 'include'
        })
        .then(resp => {
          return resp.json();
        })
        .then(review => {
          console.log(review);
          return review;
        })
        .catch(err => {
          console.log("ERROR: " + err);
          return {};
        })
      }
      else {
        console.log("this recipe hasn't got an id yet :(");
        return this.createRecipe({"uri": recipeURI})
            .then(recipe => {
              console.log("here's the recipe we got back....");
              console.log(recipe);
              return this.addReview(recipe.id, null, review);
            });
      }
    }

    getReviews(recipeId, recipeURI) {
      if(recipeId) {
        let url = BASE_URL + "/api/review/id/" + recipeId;
        return fetch(url, {}).then((response) => {
          return response.json();
        })
        .then(reviews => {
          console.log(reviews);
          return reviews;
        });
      }
      else {
        console.log("finding reviews for recipe with uri " + recipeURI);
        let url = BASE_URL + "/api/review/uri/?uri=" + encodeURIComponent(recipeURI);
        console.log(url);
        return fetch(url, {}).then(response => {
          return response.json();
        })
        .then(reviews => {
          console.log("here's the recipe we found for uri " + recipeURI);
          return reviews;
        })
        .catch(err => {
          console.log(err);
          return [];
        });
      }
    }

    getCreatedByUser(recipeId) {
      let url = BASE_URL + "/api/recipe/" + recipeId + "/user";
      console.log(url);
      return fetch(url, {})
             .then(resp => resp.json())
             .then(user => {
               console.log("created by user " + JSON.stringify(user));
               return user;
             })
             .catch(err => {
               console.log("error, no user for recipe " + recipeId);
               return null;
             });
    }

    getEndorsedByUsers(recipeId, recipeURI) {
      if(recipeId) {
        let url = BASE_URL + "/api/recipe/" + recipeId + "/endorsedBy"
        return fetch(url).then(resp => resp.json())
                         .then(endorsedByUsers => {
                           console.log("all of these people endorsed this recipe!");
                           console.log(endorsedByUsers);
                           return endorsedByUsers;
                         });
      }
      else if(recipeURI) {
        return this.getRecipeByURI(recipeURI)
                   .then(recipe => {
                     if(recipe) {
                       return this.getEndorsedByUsers(recipe.id);
                     }
                     else {
                       return null;
                     }
                   });
      }
    }

    endorseRecipe(recipeId, recipeURI) {
      let url = BASE_URL + "/api/recipe/" + recipeId + "/endorse";
      if(recipeId) {
        return fetch(url, {
            method: "put",
            credentials: "include"
          })
          .then(resp => resp.json())
          .then(user => {
            console.log(user);
            console.log("endorsed recipe!");
            return user;
          });
      }
      else if(recipeURI) {
        console.log("this recipe hasn't got an id yet :(");
        return this.createRecipe({"uri": recipeURI})
            .then(recipe => {
              console.log("here's the recipe we got back....");
              console.log(recipe);
              return this.endorseRecipe(recipe.id, null);
            });
      }
    }

    saveRecipe(recipeId, recipeURI) {
      let url = BASE_URL + "/api/recipe/" + recipeId + "/save";
      if(recipeId) {
        return fetch(url, {
            method: "put",
            credentials: "include"
          })
          .then(resp => resp.json())
          .then(user => {
            console.log(user);
            console.log("save recipe!");
            return user;
          });
      }
      else if(recipeURI) {
        console.log("this recipe hasn't got an id yet :(");
        return this.createRecipe({"uri": recipeURI})
            .then(recipe => {
              console.log("here's the recipe we got back....");
              console.log(recipe);
              return this.saveRecipe(recipe.id, null);
            });
      }
    }

    togglePrivatizeRecipe(recipeId) {
      let url = BASE_URL + "/api/recipe/" + recipeId + "/privatize";
      return fetch(url, {
        method: 'put',
        credentials: "include"
      })
      .then(resp => resp.json())
      .then(recipe => {
        console.log(recipe);
        return recipe;
      })
    }

    getRecipeByURI(recipeURI) {
      let url = BASE_URL + "/api/recipe/uri/?uri=" + encodeURIComponent(recipeURI);
      return fetch(url, {
        credentials: "include"
      })
      .then(resp => resp.json())
      .then(recipe => {
        console.log(recipe);
        return recipe;
      })
      .catch(err => {
        return null;
      })
    }

    getRecipeByID(recipeID) {
      let url = BASE_URL + "/api/recipe/" + recipeID;
      return fetch(url).then(resp => resp.json())
                       .then(recipe => {
                         recipe.ingredients = recipe.ingredients.map(ingredient => {
                           //let yippy = {...ingredient, "text": ingredient.quantity + " " + ingredient.measure.label + " " + ingredient.food.label};
                           //alert(JSON.stringify(yippy));
                           return {...ingredient, "text": ingredient.quantity + " " + ingredient.measure.label + " " + ingredient.food.label};
                         });
                         return recipe;
                       })
    }
}
