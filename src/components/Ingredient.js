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
    this.setState({"ingredient": {
      ...this.state.ingredient,
      quantity : evt.target.value
    }});
  }

  setMeasure(evt) {
    console.log(evt.target.value);
    this.setState({"ingredient": {
      ...this.state.ingredient,
      measure : evt.target.value
    }});
  }

  setFood(evt) {
    console.log(evt.target.value);
    this.setState({"ingredient": {
      ...this.state.ingredient,
      food : evt.target.value
    }});
  }

  render() {
    return (<div>
      <input placeholder="1" value={this.state.ingredient.quantity} onChange={this.setQuantity} />
      <input placeholder="cup" value={this.state.ingredient.measure} onChange={this.setMeasure} />
      <input placeholder="parsley" value={this.state.ingredient.food} onChange={this.setFood} />
    </div>);
  }
}
