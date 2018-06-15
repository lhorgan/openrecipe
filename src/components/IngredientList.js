import React from 'react';
import Ingredient from './Ingredient';

export default class IngredientList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients : [{
        quantity : "",
        measure : "",
        food : ""
      }]
    };
    this.ingredientRows = this.ingredientRows.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
  }

  ingredientRows() {
    console.log("RENDERING ROWS");
    console.log(this.state.ingredients);
    var rows =  this.state.ingredients.map((ingredient, index) => {
      console.log("ingredient " + index + " : ");
      console.log(ingredient);
      return (
        <Ingredient ingredient={ingredient} key={index}/>
      )
    });
    return rows;
  }

  addIngredient() {
    var ingredientAdded = this.state.ingredients;
    ingredientAdded.push({
      quantity : "",
      measure : "",
      food : ""
    });
    this.setState({ingredients: ingredientAdded});
    console.log(this.state.ingredients);
  }

  render() {
    return (
      <div>
        {this.ingredientRows()}<button onClick={this.addIngredient}>+</button>
      </div>
    );
  }
}
