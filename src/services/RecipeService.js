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
      recipeCopy.ingredients = recipeCopy.ingredients.map(ingredient => {
        return {"quantity": ingredient.quantity, "food": {"label": ingredient.food}, "measure": {"label": ingredient.measure}};
      });

      fetch(USHOST + "/api/user/" + userId + "/recipe/create", {
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

    /*search(query) {
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
        return null;
      });
    }*/

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
             });
    }

    getRecipe(uri) {
      let url = EDHOST + "/search?r=" + uri
                       + "&app_id=" + APP_ID
                       + "&app_key=" + APP_KEY;

      return fetch(url, {}).then((response) => {
        return response.json();
      }).catch((error) => {
        console.error("Fetch from Edamam failed");
        console.error(error);
        return null;
      });
    }
}
