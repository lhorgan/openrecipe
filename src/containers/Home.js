import React, {Component} from 'react';
import { BrowserRouter } from 'react-router-dom'

import SearchBox from '../components/SearchBox'
import Recipe from '../components/Recipe'

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <SearchBox />
        <Recipe />
      </div>
    )
  }
}

export default Recipe;
