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

    this.updateUsers = this.updateUsers.bind(this);
  }

  componentDidMount() {
    this.userService.subscribeToUser(user => this.setState({user}));
    this.updateUsers();
  }

  updateUsers() {
    this.userService.findAllUsers()
                    .then(users => {
                      console.log("here are the users");
                      console.log(users);
                      this.setState({users: users});
                    });
  }

  render() {
    if(this.state.user) {
      //alert(this.state.user.admin);
      //alert(this.state.user.username);
      console.log(this.state.user.admin);
    }
    if(this.state.user && this.state.user.admin) {
      return (
        <div>
          <h1>Hello, user {this.state.user.id}: {this.state.user.username}!</h1>
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Admin?</th>
                <th>Chef?</th>
              </tr>
            </thead>
            <tbody>
            {this.state.users.map((user, idx) => {
              return <UserEntry user={user}
                                updateUsers={this.updateUsers}
                                key={idx} />
            })}
            </tbody>
          </table>
        </div>
      )
    }
    return <div>Please log in AS AN ADMIN YOU HACKER!</div>
  }
}

export default Admin;
