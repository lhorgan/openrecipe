const EDHOST = "https://api.edamam.com";
const USHOST = "http://localhost:8080";
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
      console.log(recipe);
      fetch(USHOST + "/api/user/" + userId + "/recipe/create", {
        method: "POST",
        body: JSON.stringify({"ingredients": [], "dietLabels": []}),
        headers: {
          'Content-Type' : 'application/json'
        },
        credentials: 'same-origin'
      }).then((response) => {
        return response.json();
      }).catch((error) => {
        console.error("ERROR in create recipe");
        console.error(error);
      });
    }

    search(query) {
      let url = EDHOST + "/search?q=" + query
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
