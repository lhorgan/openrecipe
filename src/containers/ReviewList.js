import React from 'react';

import RecipeService from '../services/RecipeService'

export default class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      recipeId: null,
      recipeURI: null,
      review: ""
    };

    this.setReview = this.setReview.bind(this);
    this.addReview = this.addReview.bind(this);

    this.recipeService = RecipeService.instance;
  }

  componentDidMount() {
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

  render() {
    return (<div>
      <div className="review-list">
        {this.state.reviews.map((review, idx) => {
          return <div key={idx}>{review.review}</div>
        })}
      </div>
      <div>
        <textarea onChange={this.setReview} value={this.state.review} />
        <button onClick={this.addReview}>Add</button>
      </div>
    </div>)
  }
}
