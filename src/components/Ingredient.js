import React from 'react'

export default class Ingredient extends React.Component {
  constructor(props) {
    super(props);

    this.state = {"ingredient": {
      quantity: 7,
      measure: "liters",
      food: "blood"
    }};

    this.componentDidMount = this.componentDidMount.bind(this);
    this.setQuantity = this.setQuantity.bind(this);
    this.setMeasure = this.setMeasure.bind(this);
    this.setFood = this.setFood.bind(this);
  }

  componentDidMount() {
    //this.setState({ingredient: this.props.ingredient});
  }

  setQuantity(evt) {
    console.log(evt.target.value);
    let newState = Object.assign(this.state);
    newState.ingredient.quantity = evt.target.vaue;
    this.setState({ingredient: newState});
  }

  setMeasure(evt) {
    console.log(evt.target.value);
    let newState = Object.assign(this.state);
    newState.ingredient.measure= evt.target.vaue;
    this.setState({ingredient: newState});
  }

  setFood(evt) {
    //console.log(evt.target.value);
    let newState = Object.assign(this.state);
    newState.ingredient.food = evt.target.vaue;
    this.setState({ingredient: newState});
  }

  render() {
    return (<div>
      <input placeholder="1" value={this.state.ingredient.quantity} onChange={this.setQuantity} />
      <input placeholder="cup" value={this.state.ingredient.measure} onChange={this.setMeasure} />
      <input placeholder="parsley" value={this.state.ingredient.food} onChange={this.setFood} />
    </div>);
  }
}
