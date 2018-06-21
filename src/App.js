import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Home from './containers/Home'
import Login from './containers/Login'
import Register from './containers/Register'
import Profile from './containers/Profile'
import Recipe from './containers/Recipe'

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
            component={Recipe}>
          </Route>
        </div>
      </Router>
    );
  }
}

export default App;
