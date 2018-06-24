import React, {Component} from 'react'

import UserService from '../services/UserService'
import UserInfo from './UserInfo'

export default class UserPage extends Component {
  constructor(props) {
    super(props);

    this.state = {"user": null, "userId": null};
    this.userService = UserService.instance;
    this.getFollowButton = this.getFollowButton.bind(this);
    this.followUser = this.followUser.bind(this);
  }

  componentDidMount() {
    let userId = this.props.match.params.userId;
    this.setState({userId: userId});
    this.userService.subscribeToUser(loggedIn => this.setState({loggedIn}));
    this.userService.findUserById(userId)
                    .then(user => {
                      this.setState({user: user});
                    });
  }

  followUser() {
    this.userService.followUser(this.state.user.id)
                    .then(user => {
                      console.log("THE USER WE ARE IS AND WE JUST FOLLOWED SOMEONE");
                      console.log(user);
                    });
  }

  getFollowButton() {
    if(this.state.loggedIn && (this.state.loggedIn.id !== this.state.user.id)) {
      this.userService.getFollowings()
          .then(following => {
            console.log(following);
          });
      return (
        <button className="btn btn-success pull-right"
                onClick={this.followUser}>Follow, ps nothing matters</button>
      )
    }
  }

  render() {
    if(this.state.user) {
      console.log(this.state.user);
      return (
        <div className="container">
          <div className="row">
            {this.getFollowButton()}
          </div>
          <UserInfo user={this.state.user} />
        </div>
      )
    }
    return <div></div>
  }
}
