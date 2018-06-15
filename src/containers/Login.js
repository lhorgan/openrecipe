import React, {Component} from 'react';
import { Form, Text, Radio, RadioGroup, TextArea, Checkbox } from 'react-form';
import UserService from '../services/UserService'
import { Link } from 'react-router-dom'
import Profile from './Profile'

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: '',
        password: ''
      }
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.userService = UserService.instance;
    this.loginUser = this.loginUser.bind(this);
    this.isEmpty = this.isEmpty.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({user: {...this.state.user, username: event.target.value}});
    console.log(this.state.user)
  }

  handlePasswordChange(event) {
    this.setState({user: {...this.state.user, password: event.target.value}});
    console.log(this.state.user)
  }

  isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  loginUser() {
    this.userService
      .login(this.state.user)
      .then((response) => {
         return response.text().then(text => {
          return text ? JSON.parse(text) : {}
         })
      })
      .then(json => {
        if (this.isEmpty(json)) {
          alert("Invalid username and password!");
        } else {
          alert("yay good job!!!");
        }

      });
  }

  render() {
    return (
      <div className="container-fluid">
        <form>
          <label>
            Username:
            <input value={this.state.user.username} onChange={this.handleUsernameChange} />
          </label>
        </form>
        <form>
          <label>
            Password:
            <input value={this.state.user.password} onChange={this.handlePasswordChange} />
          </label>
        </form>
        <Link to={`/profile`}>
          <button onClick={this.loginUser} className="btn btn-primary btn-block" type="button">
            Sign In
          </button>
        </Link>
      </div>
    )
  }
}

export default Login;
