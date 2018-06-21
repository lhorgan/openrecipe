import React, {Component} from 'react';

export default class Recipe extends Component {

  constructor(props) {
    super(props)
    this.state = {recipe: {}, tabView: ''};

    this.ingredientsSelected = this.ingredientsSelected.bind(this);
    this.nutrientsSelected = this.nutrientsSelected.bind(this);
  }

  componentDidMount() {
    this.setState({recipe: this.props.location.state.recipe});
    this.setState({tabView: 'ingredients'})
    console.log(this.props.location.state.recipe);
  }

  ingredientsSelected() {
    this.setState({tabView: 'ingredients'});
  }

  nutrientsSelected() {
    this.setState({tabView: 'nutrition'})
  }

  render() {
    return (
      <div>
        <h1>{this.state.recipe.label}</h1>
        <div>
          <ul className="nav nav-tabs">
            <li className="nav-item" onClick={this.ingredientsSelected}>
              <div className="nav-link active">
              Ingredients!
              </div>
            </li>
            <li className="nav-item" onClick={this.nutrientsSelected}>
              <div className="nav-link active">
              Nutrition Info!
              </div>
            </li>
          </ul>
            {this.state.tabView == 'ingredients' ?
              this.state.recipe.ingredients.map((ingredient, idx) => {
                return <div key={idx}>
                       {ingredient.text}
                     </div>
            }) : null}
            {this.state.tabView == 'nutrition' ?
              this.state.recipe.digest.map((nutrient, idx) => {
                return <div key={idx}>
                        {nutrient.label}":" {nutrient.total} {nutrient.unit}
                       </div>
             }) : null}
        </div>
      </div>
    )
  }
}
