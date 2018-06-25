import React, {Component} from 'react';

import UserService from '../services/UserService'
import RecipeService from '../services/RecipeService'

class UserInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      loggedIn: null,
      followings: [],
      followers: [],
      savedRecipes: []
    };

    this.userService = UserService.instance;
    this.getActualSavedRecipes = this.getActualSavedRecipes.bind(this);
    this.recipeService = RecipeService.instance;
  }

  componentDidMount() {
    this.userService.subscribeToUser(loggedIn => this.setState({loggedIn}));
    this.setState({user: this.props.user}, () => {
      this.userService.getFollowings(this.state.user.id)
                      .then(followings => this.setState({followings}));
      this.userService.getFollowers(this.state.user.id)
                      .then(followers=> this.setState({followers}));
      this.getActualSavedRecipes();
    });
  }

  getActualSavedRecipes() {
    if(this.state.user) {
      let promises = [];
      let saneRecipes = [];
      for(let i = 0; i < this.state.user.savedRecipes.length; i++) {
        let currRecipe = this.state.user.savedRecipes[i];
        if(currRecipe.uri) {
          promises.push(this.recipeService.getRecipe(currRecipe.uri));
        }
        else {
          saneRecipes.push(currRecipe);
        }
      }
      Promise.all(promises)
             .then(recipes => {
               console.log("HERE ARE ALL THE RECIPES FROM EDAMAM");
               console.log(recipes);
               //return saneRecipes.concat(recipes.map(recipe => recipe[0]));
               return saneRecipes.concat(recipes);
             })
             .then(allRecipes => {
               console.log("here are the saved recipes");
               console.log(allRecipes);
               this.setState({"savedRecipes": allRecipes});
             })
    }
  }

  render() {
    if(this.state.user) {
      console.log("\n\n\n\n");
      console.log(this.state.user);
      console.log("\n\n\n\n");
      return (
          <div className="row">
            <div className="col-lg-3 col-md-5 col-sm-12">
              {/*left col*/}
              <ul className="list-group mb-2">
                <li className="list-group-item text-muted">Profile</li>
                <li className="list-group-item text-right">
                  <span className="pull-left"><strong>Name</strong></span>
                  {this.state.user.firstName} {this.state.user.lastName}
                </li>
              </ul>
              <ul className="list-group">
                <li className="list-group-item text-muted">Activity <i className="fa fa-dashboard fa-1x" />
                </li>
                <li className="list-group-item text-right">
                  <span className="pull-left"><strong>Reviews</strong></span>
                  { this.state.user.reviews.length }
                </li>
                <li className="list-group-item text-right" style={{'cursor': 'pointer'}}>
                  <span className="pull-left"><strong>Followers</strong></span>
                  { this.state.followings.length }
                </li>
                <li className="list-group-item text-right" style={{'cursor': 'pointer'}}>
                  <span className="pull-left"><strong>Following</strong></span>
                  { this.state.followers.length }
                </li>
              </ul>
            </div>
            <div className="col-lg-9 col-md-7 col-sm-12">
              <h5>Saved Recipes</h5>
              <div>
                { this.state.savedRecipes.map((recipe, idx) => {
                  console.log(recipe);
                  return <div>{ recipe.label }</div>
                }) }
              </div>
              <div>
                <h5>Created Recipes</h5>
                { this.state.user.createdRecipes.map((recipe, idx) => {
                  console.log(recipe);
                  return <div>{recipe.label}</div>
                }) }
              </div>
            </div>

          </div>);
    }
    else {
      return <div>No user.  Sorry.</div>
    }
  }
}

export default UserInfo;
