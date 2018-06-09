import React, {Component} from 'react';
import { BrowserRouter } from 'react-router-dom'

import SearchBox from '../components/SearchBox'

class Recipe extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <SearchBox />
      </div>
    )
  }
}

export default Recipe;