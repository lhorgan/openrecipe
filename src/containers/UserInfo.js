import React, {Component} from 'react';

import UserService from '../services/UserService'

class UserInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      loggedIn: null,
      followings: [],
      followers: []
    };

    this.userService = UserService.instance;
  }

  componentDidMount() {
    this.userService.subscribeToUser(loggedIn => this.setState({loggedIn}));
    this.setState({user: this.props.user}, () => {
      this.userService.getFollowings(this.state.user.id)
                      .then(followings => this.setState({followings}));
      this.userService.getFollowers(this.state.user.id)
                      .then(followers=> this.setState({followers}));
    });
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

            </div>
          </div>);
    }
    else {
      return <div>No user.  Sorry.</div>
    }
  }
}

export default UserInfo;
