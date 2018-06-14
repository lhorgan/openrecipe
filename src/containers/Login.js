import React, {Component} from 'react';
import { Form, Text, Radio, RadioGroup, TextArea, Checkbox } from 'react-form';
import UserService from '../services/UserService'

class Login extends React.Component {
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
    this.userService = UserService.instance;
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

  createUser() {

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
        <form>
          <label>
            Verify Password:
            <input value={this.state.verifiedPassword} onChange={this.handleVerifyPassword} />
          </label>
        </form>
        <button onClick={this.createUser} className="btn btn-primary btn-block" type="button">
          Sign In
        </button>
      </div>
    )
  }
}

export default Login;
