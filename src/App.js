import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Home from './containers/Home'
import Login from './containers/Login'
import Register from './containers/Register'
import Profile from './containers/Profile'
import SearchRecipe from './containers/SearchRecipe'
import Admin from './containers/Admin'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/"
            exact component={Home}>
          </Route>
          <Route path="/login"
            component={Login}>
          </Route>
          <Route path="/register"
            component={Register}>
          </Route>
          <Route path="/profile"
            component={Profile}>
          </Route>
          <Route path="/recipe"
            component={SearchRecipe}>
          </Route>
          <Route path="/admin"
            component={Admin}>
          </Route>
        </div>
      </Router>
    );
  }
}

export default App;
