import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Home from './containers/Home'
import Login from './containers/Login'
import Register from './containers/Register'

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
        </div>
      </Router>
    );
  }
}

export default App;
