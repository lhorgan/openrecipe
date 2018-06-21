import React, {Component} from 'react';

export default class Recipe extends Component {

  constructor(props) {
    super(props)
    this.state = {recipe: {}};
  }

  componentDidMount() {
    this.setState({recipe: this.props.location.state.recipe});
  }

  render() {
    return (
      <div>
        <h1>{this.state.recipe.label}</h1>
      </div>
    )
  }
}
