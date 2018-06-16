import React from 'react'

export default class Ingredient extends React.Component {
  constructor(props) {
    super(props);

    this.setQuantity = this.setQuantity.bind(this);
    this.setMeasure = this.setMeasure.bind(this);
    this.setFood = this.setFood.bind(this);
  }

  setQuantity(evt) {
    this.props.setProperty(evt, 'quantity');
  }

  setMeasure(evt) {
    this.props.setProperty(evt, 'measure');
  }

  setFood(evt) {
    this.props.setProperty(evt, 'food');
  }

  render() {
    return (<div className="mb-2">
      <input type="number" placeholder="1" className="num-input mr-2"
             value={this.props.ingredient.quantity} onChange={this.setQuantity} />
      <input placeholder="cup" className="measure-input mr-2"
             value={this.props.ingredient.measure} onChange={this.setMeasure} />
      <input placeholder="parsley"
             value={this.props.ingredient.food} onChange={this.setFood} />
      <span className="float-right">
        <i className="fa fa-trash p-2" onClick={this.props.delete}></i>
      </span>
    </div>);
  }
}
