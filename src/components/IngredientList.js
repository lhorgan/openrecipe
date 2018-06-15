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

  udpateIngredient(index, updatedIngredient) {
    var ingredientUpdated = this.state.ingredients;
    ingredientUpdated[index] = updatedIngredient;
    this.setState()
  }

  setQuantityOfIngredient(evt, index) {
    let updatedIngredient = this.state.ingredients[index];
    updatedIngredient = {
      ...updatedIngredient,
      quantity : evt.target.value
    }

    this.setState({ingr})
  }

  setMeasureOfIngredient(evt, index) {
    console.log(evt.target.value);
    this.setState({"ingredient": {
      ...this.state.ingredient,
      measure : evt.target.value
    }});
  }

  setFoodOfIngredient(evt, index) {
    console.log(evt.target.value);
    this.setState({"ingredient": {
      ...this.state.ingredient,
      food : evt.target.value
    }});
  }

  render() {
    return (
      <div>
        {this.ingredientRows()}<button onClick={this.addIngredient}>+</button>
      </div>
    );
  }
}
