import React, {Component} from 'react';

import UserService from '../services/UserService'

class UserInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: null,
      loggedIn: null
    };

    this.userService = UserService.instance;
  }

  componentDidMount() {
    this.userService.subscribeToUser(loggedIn => this.setState({loggedIn}));
  }

  render() {

  }
}

export default UserInfo;
