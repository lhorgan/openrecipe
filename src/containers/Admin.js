import React, {Component} from 'react';
import CreateRecipeModal from '../components/CreateRecipeModal';

import UserService from '../services/UserService'
import UserEntry from '../components/UserEntry'

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      users: []
    };

    this.userService = UserService.instance;
  }

  componentDidMount() {
    this.userService.subscribeToUser(user => this.setState({user}));
    this.userService.findAllUsers()
                    .then(users => {
                      console.log("here are the users");
                      console.log(users);
                      this.setState({users: users});
                    })
  }

  render() {
    if(this.state.user && this.state.user.admin) {
      return (
        <div>
          <h1>Hello, user {this.state.user.id}: {this.state.user.username}!</h1>
          {this.state.users.map((user, idx) => {
            return <UserEntry user={user} key={idx} />
          })}
        </div>
      )
    }
    return <div>Please log in AS AN ADMIN YOU HACKER!</div>
  }
}

export default Admin;
