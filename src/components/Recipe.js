import React, {Component} from 'react';
import { BrowserRouter } from 'react-router-dom'
import Ingredient from './Ingredient'

import RecipeService from '../services/RecipeService'

const recipes = [{

}];

function makeRecipe() {
  var recipe = {"ingredients": [],
                "dietLabels": [{"label": 3}]};
  for(var i = 0; i < getRndInteger(3, 21); i++) {
    var ingredient = {"food": {"label": getRandomFood()},
                      "quantity": getRndInteger(1, 34),
                      "measure": {"label": getRandomMeasure()}
                     };
    recipe.ingredients.push(ingredient);
  }
  return recipe;
}

const measures = ["liter", "cup", "mile", "AU", "picogram"];

function getRandomMeasure() {
  return measures[getRndInteger(0, 4)];
}

const foods = [
  "apple", "banana", "cake", "dorito", "egg", "fillip", "grandma", "helado", "ice cream",
  "jam", "kit-kat", "lemon", "moped", "nitrogen", "oreo", "pistachio", "qaalude", "raisin",
  "smarmalade", "tahini", "uracil", "veggies", "wandering melon", "xanathan gum", "yams", "zucchini"
];
function getRandomFood() {
  return foods[getRndInteger(0, foods.length - 1)];
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

class Recipe extends Component {
  constructor(props) {
    super(props);

    this.setRecipe = this.setRecipe.bind(this);
    this.createRecipe = this.createRecipe.bind(this);
    this.recipeService = RecipeService.instance;
    console.log("CREATING");
    console.log(this.recipeService);
  }

  setRecipe(recipe) {
    this.setState({recipe: recipe});
  }

  createRecipe() {
    this.recipeService.createRecipe(makeRecipe(), 2);/*.then((data) => {
      console.log("YESSS");
      console.log(data);
  });*/
  }

  render() {
    return (<div>
      This is a recipe!
      <Ingredient />
      <button onClick={this.createRecipe}>PLEASE CLICK ME FOR FOOD!!!</button>
    </div>)
  }
}

export default Recipe;
