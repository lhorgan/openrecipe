import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import SearchAndList from '../containers/SearchAndList'
import Recipe from '../components/Recipe'

export default class Home extends Component {

  render() {
    return (
      <div>
        <SearchAndList />
        <Recipe />
        <Link to={`/register`} className="btn btn-primary">Register</Link>
        <Link to={`/login`} className="btn btn-default">Login</Link>
      </div>
    )
  }
}
