import React, {Component} from 'react';
import { BrowserRouter } from 'react-router-dom'

const recipes = [{
  
}];

class Recipe extends Component {
  constructor(props) {
    super(props);
  }
  
  setRecipe(recipe) {
    setState({recipe: recipe});
  }
  
  render() {
    return (<div>
      This is a recipe!
    </div>)
  }
}

export default Recipe;