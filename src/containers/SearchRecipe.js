import React, {Component} from 'react';
import '../styles/SearchRecipe.css';

import RecipeService from '../services/RecipeService'
import ReviewList from "./ReviewList"
import UserService from '../services/UserService'
import NavBar from '../components/NavBar'
import { Link } from 'react-router-dom'

export default class Recipe extends Component {

  constructor(props) {
    super(props)
    this.state = {
      recipe: {}, tabView: '', createdByUser: null,
      recipeId: null,
      user: null, endorsed: false, saved: false,
      endorsedByUsers: []
    };

    this.recipeService = RecipeService.instance;

    this.ingredientsSelected = this.ingredientsSelected.bind(this);
    this.nutrientsSelected = this.nutrientsSelected.bind(this);
    this.reviewsSelected = this.reviewsSelected.bind(this);
    this.overviewSelected = this.overviewSelected.bind(this);
    this.getCreatedByTag = this.getCreatedByTag.bind(this);
    this.userService = UserService.instance;
    this.renderEndorseButton = this.renderEndorseButton.bind(this);
    this.endorseRecipe = this.endorseRecipe.bind(this);
    this.saveRecipe = this.saveRecipe.bind(this);
    this.renderPrivatizeButton = this.renderPrivatizeButton.bind(this);
    this.togglePrivate = this.togglePrivate.bind(this);
    this.getEndorsedByUsers = this.getEndorsedByUsers.bind(this);
    this.getRecipe = null;
    this.loadRecipeFromServer = this.loadRecipeFromServer.bind(this);
  }

  componentDidMount() {
    this.setState({tabView: 'overview'});
    //alert("component mounted");
    let recipeId = this.props.match.params.id;
    //alert(recipeId);
    if(!recipeId) {
      return;
    }
    //alert("component mounted");
    let getRecipe = this.recipeService.getRecipeByID;
    //alert(parseInt(recipeId));
    if(isNaN(parseInt(recipeId))) {
      recipeId = decodeURIComponent(recipeId);
      getRecipe = this.recipeService.getRecipe;
    }
    this.setState({recipeId: recipeId});
    this.getRecipe = getRecipe;
    this.loadRecipeFromServer(recipeId);
  }

  loadRecipeFromServer(recipeId) {
    this.getRecipe(recipeId).then(recipe => {
      //alert(JSON.stringify(recipe));
      this.setState({recipe: recipe}, () => {
        //alert(this.state.recipe.id + " , " + this.state.recipe.uri);
        this.getEndorsedByUsers();
        this.userService.subscribeToUser(user => {
          if(user && user.savedRecipes) {
            for(let i = 0; i < user.savedRecipes.length; i++) {
              if((recipe.id && (user.savedRecipes[i].id === recipe.id)) ||
                 (recipe.uri && (user.savedRecipes[i].uri === recipe.uri))) {
                this.setState({saved: true});
                break;
              }
            }
            for(let i = 0; i < user.endorsedRecipes.length; i++) {
              if((recipe.id && (user.endorsedRecipes[i].id === recipe.id)) ||
                 (recipe.uri && (user.endorsedRecipes[i].uri === recipe.uri))) {
                this.setState({endorsed: true});
                break;
              }
            }
            this.setState({user});
          }
        });

        if(recipe.id) {
          this.recipeService.getCreatedByUser(recipe.id)
                            .then(user => {
                              if(user) {
                                console.log("created by user " + user.username);
                                this.setState({createdByUser: user});
                              }
                            });
        }

        //console.log(this.props.location.state.recipe);
      });
    });
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
      if(this.state.recipe.uri) {
        return (<div>
          <img src={this.state.recipe.image} />
          <div>
            <a href={this.state.recipe.url}> Click to see full recipe </a>
          </div>
        </div>);
      }
      else {
        return <div>{this.state.recipe.instructions}</div>
      }
    }
  }

  getCreatedByTag() {
    if(this.state.recipe.id) {
      if(this.state.createdByUser) {
        return (
          <div>Created by user
            <Link to={`/user/${this.state.createdByUser.id}`}> { this.state.createdByUser.username }
            </Link>
          </div>
        )
      }
      else {
        return <div>Created by an OpenRecipe user</div>
      }
    }
    else {
      return <div>Edamam recipe</div>
    }
  }

  getEndorsedByUsers() {
    this.recipeService.getEndorsedByUsers(this.state.recipe.id, this.state.recipe.uri)
                      .then(endorsedByUsers => {
                        console.log("in searchRecipe, these people endorsed me");
                        console.log(endorsedByUsers);
                        this.setState({endorsedByUsers});
                      });
  }

  endorseRecipe() {
    this.recipeService.endorseRecipe(this.state.recipe.id, this.state.recipe.uri)
                      .then(user => {
                        console.log("we have endorsed something");
                        console.log(user);
                        this.setState({endorsed: true});
                        this.userService.updateUser(user);
                        this.getEndorsedByUsers();
                      });
  }

  saveRecipe() {
    this.recipeService.saveRecipe(this.state.recipe.id, this.state.recipe.uri)
                      .then(user => {
                        console.log("we have saved something");
                        console.log(user);
                        this.setState({saved: true});
                        this.userService.updateUser(user);
                      });
  }

  togglePrivate() {
    this.recipeService.togglePrivatizeRecipe(this.state.recipe.id)
                      .then(recipe => {
                        console.log("this should be the opposite of what it was before");
                        console.log(recipe);
                        this.loadRecipeFromServer(this.state.recipe.id);
                        //this.setState({recipe});
                      })
  }

  renderEndorseButton() {
    console.log(this.state.user);
    if(this.state.user && this.state.user.chef) {
      if(!this.state.endorsed) {
        return (
          <button className="btn btn-primary m-1"
                  onClick={this.endorseRecipe}>Endorse this recipe!</button>
        )
      }
      else {
        return (<button className="btn btn-primary disabled m-1">Endorsed!</button>)
      }
    }
  }

  renderSaveButton() {
    console.log(this.state.user);
    if(this.state.user) {
      if(!this.state.saved) {
        return (
          <button className="btn btn-primary m-1"
                  onClick={this.saveRecipe}>Save this recipe!</button>
        )
      }
      else {
        return (<button className="btn btn-primary disabled">Saved!</button>)
      }
    }
  }

  renderPrivatizeButton() {
    if(this.state.user && this.state.user.reputable && this.state.recipe.id) {
      if(this.state.createdByUser && this.state.user.id === this.state.createdByUser.id) {
        //alert("we need a privatize button here");
        console.log("we maybe wanna make the following recipe private");
        //alert("196");
        console.log(this.state.recipe);
        if (this.state.recipe) {
          //alert("199");``
          if (this.state.recipe.private) {
            return <button className="btn btn-danger m-1" onClick={this.togglePrivate}>Make public</button>
          } else {
            return <button className="btn btn-danger m-1" onClick={this.togglePrivate}>Make Private</button>
          }
        }
      }
    }
  }

  render() {
    if(this.state.recipe) {
      return (
        <div>
          <NavBar/>
          <div className="container">
            <div className="row">
              <div className="col-8">
                <div className="container-fluid">
                  <h1>{this.state.recipe.label}</h1>
                  <div>
                    { this.getCreatedByTag() }
                    <span className="pull-right">Endorsed by {this.state.endorsedByUsers ? this.state.endorsedByUsers.length : 0} user(s)</span>
                  </div>
                  <div>
                    {this.renderEndorseButton()}
                    {this.renderSaveButton()}
                    {this.renderPrivatizeButton()}
                  </div>
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
              </div>
            </div>
          </div>
        )
      }
      else {
        return <div>Could not fetch recipe from Edamam because they are evil people with harsh limits.  Plesae try back in a few minutes.</div>
      }
  }
}
