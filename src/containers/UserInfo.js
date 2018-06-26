import React, {Component} from 'react';

import UserService from '../services/UserService'
import RecipeService from '../services/RecipeService'

import { Link } from 'react-router-dom'

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
                      .then(followings => this.setState({followings: followings}));
      this.userService.getFollowers(this.state.user.id)
                      .then(followers=> this.setState({followers: followers}));
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
               this.setState({"savedRecipes": allRecipes});
             })
             .catch(err => {
               this.setState({"savedRecipes": saneRecipes});
             })
    }
  }

  render() {
    if(this.state.user) {
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
                  { this.state.followers.length }
                </li>
                <li className="list-group-item text-right" style={{'cursor': 'pointer'}}>
                  <span className="pull-left"><strong>Following</strong></span>
                  { this.state.followings.length }
                </li>
              </ul>
            </div>
            <div className="col-lg-9 col-md-7 col-sm-12">
              <div className="box">
                <h5>Saved Recipes</h5>
                { this.state.savedRecipes.map((recipe, idx) => {
                  if(recipe) {
                    let rid = recipe.id;
                    if(recipe.uri) {
                      rid = encodeURIComponent(recipe.uri);
                    }
                    return <div key={idx}><Link to={`/recipe/fancy/${rid}`}> { recipe.label }</Link></div>
                  }
                  else {
                    return <div>Edamam recipe: could not load (API limit)</div>
                  }
                }) }
              </div>
              <div className="box">
                <h5>Created Recipes</h5>
                { this.state.user.createdRecipes.map((recipe, idx) => {
                  let rid = recipe.id;
                  return <div key={idx}><Link to={`/recipe/fancy/${rid}`}> { recipe.label }</Link></div>
                }) }
              </div>
              <div className="box">
                <h5>Following</h5>
                { this.state.followings.map((user, idx) => {
                  return <div key="idx">{ user.username }</div>
                })}
              </div>
              <div className="box">
                <h5>Followers</h5>
                { this.state.followers.map((user, idx) => {
                  return <div key="idx">{ user.username }</div>
                })}
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
