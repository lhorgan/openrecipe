import React from 'react'

export default class Ingredient extends React.Component {
  constructor(props) {
    super(props);

    this.state = {"ingredient": {
      'quantity': "",
      'measure': "",
      'food': ""
    }};

    this.componentDidMount = this.componentDidMount.bind(this);
    this.setQuantity = this.setQuantity.bind(this);
    this.setMeasure = this.setMeasure.bind(this);
    this.setFood = this.setFood.bind(this);
  }

  componentDidMount() {
    if (this.props.ingredient) {
      this.setState({ingredient: this.props.ingredient});
    }
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
    return (<div>
      <input placeholder="1" value={this.state.ingredient.quantity} onChange={this.setQuantity} />
      <input placeholder="cup" value={this.state.ingredient.measure} onChange={this.setMeasure} />
      <input placeholder="parsley" value={this.state.ingredient.food} onChange={this.setFood} />
    </div>);
  }
}
