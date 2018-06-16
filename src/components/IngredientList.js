import React from 'react';
import Ingredient from './Ingredient';

export default class IngredientList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients : [{
        'quantity' : "",
        'measure' : "",
        'food' : ""
      }]
    };
    this.ingredientRows = this.ingredientRows.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.setPropertyOfIngredient = this.setPropertyOfIngredient.bind(this);
  }

  ingredientRows() {
    var rows =  this.state.ingredients.map((ingredient, index) => {
      return (
        <Ingredient ingredient={ingredient} key={index}
                    setProperty={(evt, property) => (
                      this.setPropertyOfIngredient(evt, property, index)
                    )}/>
      )
    });
    return rows;
  }

  addIngredient() {
    this.setState({
      ingredients: [...this.state.ingredients, {
          'quantity' : "",
          'measure' : "",
          'food' : ""
        }]});
    console.log(this.state.ingredients);
  }

  setPropertyOfIngredient(evt, property, index) {
    let updatedIngredient = this.state.ingredients[index];
    updatedIngredient[property] = evt.target.value;
    let updatedIngredients = this.state.ingredients.slice();
    //updatedIngredients[index] = updatedIngredient;
    this.setState({ingredients: updatedIngredients})
  }

  render() {
    return (
      <div>
        {this.ingredientRows()}<button onClick={this.addIngredient}>+</button>
      </div>
    );
  }
}
