import React, {Component} from 'react';
import CreateRecipeModal from '../components/CreateRecipeModal';

import UserService from '../services/UserService'

class UserEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };

    this.userService = UserService.instance;
  }

  componentDidMount() {
    this.setState({user: this.props.user});
  }

  render() {
    if(this.state.user) {
      return <div>{ this.state.user.username }</div>
    }
    else {
      return <div>No user</div>
    }
  }
}

export default UserEntry;
