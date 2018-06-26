import React, {Component} from 'react';
import CreateRecipeModal from '../components/CreateRecipeModal';

import UserService from '../services/UserService'
import UserEntry from '../components/UserEntry'
import NavBar from '../components/NavBar'
import RegisterHelper from './RegisterHelper'

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      users: []
    };

    this.userService = UserService.instance;

    this.updateUsers = this.updateUsers.bind(this);
    this.onCreateUser = this.onCreateUser.bind(this);
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

  onCreateUser() {
    this.updateUsers();
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
          <NavBar/>
          <div className="container">
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
            <h3>Create New User</h3>
            <RegisterHelper onRegister={this.onCreateUser} />
          </div>
        </div>
      )
    }
    return <div>Please log in AS AN ADMIN YOU HACKER!</div>
  }
}

export default Admin;
