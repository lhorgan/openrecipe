import React, {Component} from 'react';

import UserService from '../services/UserService'

class UserInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      loggedIn: null
    };

    this.userService = UserService.instance;
  }

  componentDidMount() {
    this.userService.subscribeToUser(loggedIn => this.setState({loggedIn}));
    this.setState({user: this.props.user});
  }

  render() {
    if(this.state.user) {
      return (
          <div className="row">
            <div className="col-lg-3 col-md-5 col-sm-12">
              {/*left col*/}
              <ul className="list-group mb-2">
                <li className="list-group-item text-muted">Profile</li>
                <li className="list-group-item text-right"><span className="pull-left"><strong>Joined</strong></span>never</li>
                <li className="list-group-item text-right"><span className="pull-left"><strong>Real name</strong></span>boop</li>
              </ul>
              <ul className="list-group">
                <li className="list-group-item text-muted">Activity <i className="fa fa-dashboard fa-1x" />
                </li>
                <li className="list-group-item text-right"><span className="pull-left"><strong>Reviews</strong></span>3</li>
                <li className="list-group-item text-right" style={{'cursor': 'pointer'}}>
                  <span className="pull-left"><strong>Followers</strong></span>3
                </li>
                <li className="list-group-item text-right" style={{'cursor': 'pointer'}}>
                  <span className="pull-left"><strong>Following</strong></span>3
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
