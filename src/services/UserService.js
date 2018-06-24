//const BASE_URL = "https://recipe-server-4550.herokuapp.com";
const BASE_URL = "http://localhost:8080";

const USER_API_URL =
    BASE_URL + '/api/user';
const LOGIN_API_URL =
    BASE_URL + '/api/login';
const REGISTER_API_URL =
    BASE_URL + '/api/register';

let _singleton = Symbol();

export default class UserService {
    constructor(singletonToken) {
      this.userUpdateCallbacks = [];
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
        method: 'POST',
        credentials: 'include'
      });
    }

    updateUser(user) {
      this.user = user;
      console.log("here's our new user");
      console.log(user);
      for(let i = 0; i < this.userUpdateCallbacks.length; i++) {
        this.userUpdateCallbacks[i](user);
      }
    }

    subscribeToUser(cb) {
      this.userUpdateCallbacks.push(cb);
      if(this.user) {
        console.log("we have a user already!");
        for(let i = 0; i < this.userUpdateCallbacks.length; i++) {
          this.userUpdateCallbacks[i](this.user);
        }
      }
      else {
        console.log("we haven't got a user atm");
        this.getLoggedInUser();
      }
    }

    getLoggedInUser() {
      return this.user;
    }

    login(user) {
      return fetch(LOGIN_API_URL, {
        method: 'post',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      .then(resp => {
        return resp.json();
      })
      .then(user => {
        console.log("Logged in user " + JSON.stringify(user));
        this.updateUser(user);
      });
    }

    registerUser(user) {
      return fetch(REGISTER_API_URL, {
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        credentials: 'include'
      });
    }

    getLoggedInUser() {
      if(!this.user) {
        this.user = {};
        console.log("setting empty user");
        return fetch(USER_API_URL + "/current", {
          credentials: 'include'
        })
        .then(resp => resp.json())
        .then(user => {
          console.log("fetched user " + JSON.stringify(user) + " from server");
          this.updateUser(user);
          return user;
        })
        .catch(err => {
          console.log("ERROR " + err);
        });
      }
      else {
        return new Promise(() => this.user);
      }
    }

    saveUser(userId, user) {
      return fetch(USER_API_URL + "/" + userId, {
        method: 'put',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      .then(resp => {
        return resp.json();
      })
      .then(user => {
        if(user.id === this.user.id) {
          this.updateUser(user);
          return user;
        }
      });
    }

    findAllUsers() {
      console.log("fetching all users");
      return fetch(USER_API_URL, {credentials: "include"})
             .then(resp => resp.json())
             .then(users => {
               console.log("WE FOUND THE FOLLOWING LIST OF USERS");
               console.log(users);
               return users;
             });
    }

    getUser(id) {
      return fetch(USER_API_URL, {credentials: "include"})
            .then(resp => resp.json())
            .then(user => {
              console.log("GOT USER " + id);
              console.log(user);
              return user;
            })
    }
}
