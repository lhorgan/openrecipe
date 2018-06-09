import React, {Component} from 'react';
import { BrowserRouter } from 'react-router-dom'
import SearchBox from './SearchBox'

class Recipe extends Component {
  constructor(props) {
    super(props);
    
    this.setRecipe = this.setRecipe.bind(this);
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