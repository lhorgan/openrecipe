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
    this.setState({ingredients: this.state.ingredients.push({
      quantity : "",
      measure : "",
      food : ""
    })});
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
