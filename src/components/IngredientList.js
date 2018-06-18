import React from 'react';
import Ingredient from './Ingredient';

export default class IngredientList extends React.Component {
  constructor(props) {
    super(props);
    this.ingredientRows = this.ingredientRows.bind(this);
  }

  ingredientRows() {
    var rows =  this.props.ingredients.map((ingredient, index) => {
      return (
        <Ingredient ingredient={ingredient} key={index}
                    setProperty={(evt, property) => (
                      this.props.setProperty(evt, property, index)
                    )}
                    setQuantity={(evt) => (
                      this.props.setQuantity(evt, index)
                    )}
                    delete={() => (
                      this.props.delete(index)
                    )}/>
      )
    });
    return rows;
  }

  render() {
    return (
      <div className="clearfix">
        <h5>Ingredients</h5>
        {this.ingredientRows()}
        <button className="btn btn-default float-right"
                onClick={this.props.add}>Add Ingredient</button>
      </div>
    );
  }
}
