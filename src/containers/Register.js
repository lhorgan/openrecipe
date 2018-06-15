import React, {Component} from 'react';
import { Form, Text, Radio, RadioGroup, TextArea, Checkbox } from 'react-form';
import UserService from '../services/UserService'
import Profile from './Profile'
import { Link } from 'react-router-dom'

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: '',
        password: ''
      },
      verifiedPassword: ''
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleVerifyPassword = this.handleVerifyPassword.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.userService = UserService.instance;
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

  handleVerifyPassword(event) {
    this.setState({verifiedPassword: event.target.value});
  }

  isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  registerUser() {
    if (this.state.user.password !== this.state.verifiedPassword) {
      alert("Passwords do not match!");
    }
    else if (this.state.user.username == "") {
      alert("Please enter a valid username")
    } else {
      this.userService
        .registerUser(this.state.user)
        .then((response) => {
           return response.text().then(text => {
            return text ? JSON.parse(text) : {}
           })
        }).then(json => {
            if (this.isEmpty(json)) {
              alert("This username is already taken!");
            } else {
              this.props.history.push('/profile');
            }
        });
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <h1>Register</h1>
        <div>
          <form>
            <label>
              Username:
              <input className="form-control" value={this.state.user.username} onChange={this.handleUsernameChange} />
            </label>
          </form>
        </div>
        <div>
          <form>
            <label>
              Password:
              <input className="form-control" value={this.state.user.password} onChange={this.handlePasswordChange} />
            </label>
          </form>
        </div>
        <div>
          <form>
            <label>
              Verify Password:
              <input className="form-control" value={this.state.verifiedPassword} onChange={this.handleVerifyPassword} />
            </label>
          </form>
        </div>
        <button onClick={this.registerUser} className="btn btn-primary btn-block" type="button">
          Register
        </button>

        <Link to={`/login`}>
          Login
        </Link>
        <Link to={`/`} className="float-right">
          Home
        </Link>
      </div>
    )
  }
}

export default Register;
