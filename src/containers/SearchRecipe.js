import React, {Component} from 'react';

export default class Recipe extends Component {

  constructor(props) {
    super(props)
    this.state = {recipe: {}, tabView: ''};

    this.ingredientsSelected = this.ingredientsSelected.bind(this);
    this.nutrientsSelected = this.nutrientsSelected.bind(this);
    this.reviewsSelected = this.reviewsSelected.bind(this);
    this.overviewSelected = this.overviewSelected.bind(this);
  }

  componentDidMount() {
    this.setState({recipe: this.props.location.state.recipe});
    this.setState({tabView: 'overview'})
    console.log(this.props.location.state.recipe);
  }

  ingredientsSelected() {
    this.setState({tabView: 'ingredients'});
  }

  nutrientsSelected() {
    this.setState({tabView: 'nutrition'});
  }

  reviewsSelected() {
    this.setState({tabView: 'reviews'});
  }

  overviewSelected() {
    this.setState({tabView: 'overview'});
  }

  render() {
    return (
    <div className="row">
      <div className="col-8">
        <div className="container-fluid">
        <h1>{this.state.recipe.label}</h1>
        <div>
          <ul className="nav nav-tabs">
            <li className="nav-item" onClick={this.overviewSelected}>
              <div className="nav-link active">
                Overview
              </div>
            </li>
            <li className="nav-item" onClick={this.ingredientsSelected}>
              <div className="nav-link active">
                Ingredients
              </div>
            </li>
            <li className="nav-item" onClick={this.nutrientsSelected}>
              <div className="nav-link active">
                Nutrition Info
              </div>
            </li>
            <li className="nav-item" onClick={this.reviewsSelected}>
              <div className="nav-link active">
                Reviews
              </div>
            </li>
          </ul>
            {this.state.tabView === 'ingredients' ?
              this.state.recipe.ingredients.map((ingredient, idx) => {
                return <div key={idx}>
                       {ingredient.text}
                     </div>
            }) :
            this.state.tabView === 'nutrition' ?
              this.state.recipe.digest.map((nutrient, idx) => {
                return <div key={idx}>
                        {nutrient.label}: {nutrient.total} {nutrient.unit}
                       </div>
            }) :
            this.state.tabView === 'reviews' ?
              <h1>Reviews will go here!!</h1> :
              <img src={this.state.recipe.image} />}
              <div>

              </div>

              <div>
                <a href={this.state.recipe.url}> Click to see full recipe </a>
              </div>
        </div>
        </div>
      </div>
      </div>
    )
  }
}
