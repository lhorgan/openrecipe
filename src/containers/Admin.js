import React, {Component} from 'react';
import CreateRecipeModal from '../components/CreateRecipeModal';

import UserService from '../services/UserService'

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };

    this.userService = UserService.instance;
  }

  componentDidMount() {
    this.userService.subscribeToUser(user => this.setState({user}));
  }

  render() {
    if(this.state.user) {
      return (
        <div>
          <h1>Hello, user {this.state.user.id}: {this.state.user.username}!</h1>
        </div>
      )
    }
    return <div>Please log in!</div>
  }
}

export default Admin;
