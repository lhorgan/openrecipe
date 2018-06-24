import React, {Component} from 'react';
import '../styles/SearchRecipe.css';

import ReviewList from "./ReviewList"

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

  showTab() {
    if(this.state.tabView === "ingredients") {
      return this.state.recipe.ingredients.map((ingredient, idx) => {
                return <div key={idx}>
                        {ingredient.text}
                       </div>});
    }
    else if(this.state.tabView === "nutrition") {
      if(this.state.recipe.digest) {
        return this.state.recipe.digest.map((nutrient, idx) => {
                  return <div key={idx}>
                          {nutrient.label}: {nutrient.total} {nutrient.unit}
                         </div>});
      }
      else {
        return <div>This recipe has not got any nutrition info. How about you just enjoy it?</div>
      }
    }
    else if(this.state.tabView === "reviews") {
      if(this.state.recipe.id) {
        console.log("This recipe has an ID!");
        return <ReviewList recipeId={this.state.recipe.id} />
      }
      else if(this.state.recipe.uri) {
        console.log("This recipe has a URI: " + this.state.recipe.uri);
        return <ReviewList recipeURI={this.state.recipe.uri} />
      }
    }
    else if(this.state.tabView === "overview") {
      return <div>Overview</div>
      /*return (<div>
        Overview
        <img src={this.state.recipe.image} />
        <div>
          <a href={this.state.recipe.url}> Click to see full recipe </a>
        </div>
      </div>);*/
    }
  }

  render() {
    return (<div className="row">
      <div className="col-8">
        <div className="container-fluid">
          <h1>{this.state.recipe.label}</h1>
          <div>
            <ul className="nav nav-tabs">
              <li className="nav-item recipe-tab" onClick={this.overviewSelected}>
                <div className="nav-link active">
                  Overview
                </div>
              </li>
              <li className="nav-item recipe-tab" onClick={this.ingredientsSelected}>
                <div className="nav-link active">
                  Ingredients
                </div>
              </li>
              <li className="nav-item recipe-tab" onClick={this.nutrientsSelected}>
                <div className="nav-link active">
                  Nutrition Info
                </div>
              </li>
              <li className="nav-item recipe-tab" onClick={this.reviewsSelected}>
                <div className="nav-link active">
                  Reviews
                </div>
              </li>
            </ul>

            {this.showTab()}

          </div>
        </div>
      </div>
    </div>)
  }
}
