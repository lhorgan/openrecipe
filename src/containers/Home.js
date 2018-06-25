import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import SearchAndList from '../containers/SearchAndList'
import Recipe from '../components/Recipe'
import NavBar from '../components/NavBar'

export default class Home extends Component {

  render() {
    return (
      <div>
        <NavBar />
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4">OpenRecipe</h1>
            <p className="lead">
              Here is some generic text that someone more creative than me will replace with something
              that is actually engaging.
            </p>
            <SearchAndList />
          </div>
        </div>

        <Recipe />
      </div>
    )
  }
}
