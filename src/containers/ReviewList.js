import React from 'react';

import RecipeService from '../services/RecipeService'
import UserService from '../services/UserService'

export default class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      recipeId: null,
      recipeURI: null,
      review: "",
      user: null
    };

    this.setReview = this.setReview.bind(this);
    this.addReview = this.addReview.bind(this);

    this.recipeService = RecipeService.instance;
    this.userService = UserService.instance;
  }

  componentDidMount() {
    this.userService.subscribeToUser(user => this.setState({user}));
    this.setState({recipeId: this.props.recipeId});
    this.setState({recipeURI: this.props.recipeURI});
    this.recipeService.getReviews(this.props.recipeId, this.props.recipeURI)
                      .then(reviews => {
                        console.log(reviews);
                        this.setState({reviews: reviews});
                      })
  }

  addReview() {
    console.log("adding a review...");
    console.log(this.state.review);
    console.log(this.state.recipeId);
    console.log(this.state.recipeURI);
    this.recipeService.addReview(this.state.recipeId, this.state.recipeURI, this.state.review);
  }

  setReview(evt) {
    this.setState({"review": evt.target.value});
  }

  addButton() {
    if(this.state.user && this.state.user.id) {
      return (
        <form>
          <div>
            <textarea onChange={this.setReview} value={this.state.review} className="form-control" />
          </div>
          <div>
            <button className="btn btn-success" onClick={this.addReview}>Add</button>
          </div>
        </form>
      )
    }
    else {
      return <div>Log in to add a review.</div>
    }
  }

  render() {
    return (<div>
      <div className="review-list">
        {this.state.reviews.map((review, idx) => {
          return <div key={idx} className="box">{review.review}</div>
        })}
      </div>
      <div>
        { this.addButton() }
      </div>
    </div>)
  }
}
