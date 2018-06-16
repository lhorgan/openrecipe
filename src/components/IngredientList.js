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
    this.deleteIngredient = this.deleteIngredient.bind(this);
  }

  ingredientRows() {
    var rows =  this.state.ingredients.map((ingredient, index) => {
      return (
        <Ingredient ingredient={ingredient} key={index}
                    setProperty={(evt, property) => (
                      this.setPropertyOfIngredient(evt, property, index)
                    )}
                    delete={() => (
                      this.deleteIngredient(index)
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

  deleteIngredient(index) {
    let ingredientDeleted = this.state.ingredients.slice();
    ingredientDeleted.splice(index, 1);
    this.setState( {ingredients: ingredientDeleted})
  }

  setPropertyOfIngredient(evt, property, index) {
    let updatedIngredients = this.state.ingredients.slice();
    let updatedIngredient = updatedIngredients[index];
    updatedIngredient[property] = evt.target.value;
    this.setState({ingredients: updatedIngredients})
  }

  render() {
    return (
      <div className="clearfix">
        <h5>Ingredients</h5>
        {this.ingredientRows()}
        <button className="btn btn-default float-right"
                onClick={this.addIngredient}>Add Ingredient</button>
      </div>
    );
  }
}
