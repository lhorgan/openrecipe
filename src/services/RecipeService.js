const EDHOST = "https://api.edamam.com";
const APP_ID = "9e5dbffd";
const APP_KEY = "7a87790bd58b4773a7936914a67cb03b";

let _singleton = Symbol();

export default class AssignmentService {
    constructor(singletonToken) {
      //console.log(process.env);
      if (_singleton !== singletonToken)
        throw new Error('Cannot instantiate directly.');
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
  }
}