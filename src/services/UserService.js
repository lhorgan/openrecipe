const BASE_URL = "https://recipe-server-4550.herokuapp.com";
//const BASE_URL = "http:localhost:8000";

const USER_API_URL =
    BASE_URL + '/api/user';
const LOGIN_API_URL =
    BASE_URL + '/api/login';
const REGISTER_API_URL =
    BASE_URL + '/api/register';

let _singleton = Symbol();

export default class UserService {
    constructor(singletonToken) {
      if (_singleton !== singletonToken)
        throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
      if(!this[_singleton])
        this[_singleton] = new UserService(_singleton);
      return this[_singleton]
    }

    createUser(user) {
      return fetch(USER_API_URL, {
        body: JSON.stringify(user),
        headers: {
           'Content-Type': 'application/json'
        },
        method: 'POST'
      });
    }

    login(user) {
      return fetch(LOGIN_API_URL, {
        method: 'post',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
      });
    }

    registerUser(user) {
      return fetch(REGISTER_API_URL, {
        body: JSON.stringify(user),
        headers: {
           'Content-Type': 'application/json'
        },
        method: 'POST'
      });
    }
}
