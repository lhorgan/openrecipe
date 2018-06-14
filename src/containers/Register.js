import React, {Component} from 'react';
import { Form, Text, Radio, RadioGroup, TextArea, Checkbox } from 'react-form';

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
    this.createUser = this.createUser.bind(this);
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
    if (this.state.user.password !== this.state.verifiedPassword) {
      alert("Passwords do not match!");
    }

    // do some service shit here

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
          Register
        </button>
      </div>
    )
  }
}

export default Register;
