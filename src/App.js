import React, { Component } from 'react';

import Recipe from './components/Recipe'

import Home from './containers/Home'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Home />
      </div>
    );
  }
}

export default App;
