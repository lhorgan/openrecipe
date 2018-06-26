import React, {Component} from 'react'

import UserService from '../services/UserService'
import UserInfo from './UserInfo'
import NavBar from '../components/NavBar'

export default class UserPage extends Component {
  constructor(props) {
    super(props);

    this.state = {"user": null, "userId": null, "following": false};
    this.userService = UserService.instance;
    this.getFollowButton = this.getFollowButton.bind(this);
    this.followUser = this.followUser.bind(this);
  }

  componentDidMount() {
    let userId = this.props.match.params.userId;
    this.setState({userId: userId});

    this.userService.findUserById(userId)
                    .then(user => this.setState({user: user}, () => {
                      this.userService.subscribeToUser(loggedIn => this.setState({loggedIn}, () => {
                        this.userService.getFollowings(this.state.loggedIn.id)
                                        .then(following => {
                                          console.log(following);
                                          for(let i = 0; i < following.length; i++) {
                                            if(following[i].id === this.state.user.id) {
                                              this.setState({"following": true});
                                            }
                                          }
                                        });
                      }))}));
  }

  followUser() {
    this.userService.followUser(this.state.user.id)
                    .then(user => {
                      console.log("THE USER WE ARE IS AND WE JUST FOLLOWED SOMEONE");
                      console.log(user);
                      this.setState({"following": true});
                    });
  }

  getFollowButton() {
    if(this.state.loggedIn && (this.state.loggedIn.id !== this.state.user.id) && this.state.loggedIn.id) {
      if(this.state.following) {
        return <button className="disabled btn btn-success">Following!</button>
      }
      else {
        return (
          <button className="btn btn-success m-1 pull-right"
                  onClick={this.followUser}>Follow</button>
        )
      }
    }
  }

  render() {
    if(this.state.user) {
      console.log(this.state.user);
      return (
        <div>
          <NavBar />
          <div className="container">
            <div className="row">
              <h3>User: {this.state.user.username}</h3>
              {this.getFollowButton()}
            </div>
            <UserInfo user={this.state.user} />
          </div>
        </div>
      )
    }
    return <div></div>
  }
}
