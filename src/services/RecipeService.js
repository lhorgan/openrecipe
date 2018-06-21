const BASE_URL = "https://recipe-server-4550.herokuapp.com";
//const BASE_URL = "http:localhost:8000";

const EDHOST = "https://api.edamam.com";
const USHOST = BASE_URL;
const APP_ID = "8b63961c";
const APP_KEY = "5d3dc98ab8d33fdbed1564c15ad8f17b";

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
