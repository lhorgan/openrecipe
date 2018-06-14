import React, {Component} from 'react';
import { BrowserRouter } from 'react-router-dom'

const recipes = [{
  
}];

class RecipeList extends Component {
  constructor(props) {
    super(props);
    
    this.setRecipe = this.setRecipe.bind(this);
  }
  
  setRecipe(recipe) {
    this.setState({recipe: recipe});
  }
  
  render() {
    return (<div>
      This is a list!
    </div>)
  }
}

export default RecipeList;