import React, {Component} from 'react'

import UserService from '../services/UserService'
import RegisterHelper from './RegisterHelper'

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.onRegister = this.onRegister.bind(this);
    this.userService = UserService.instance;
  }

  onRegister() {
    //alert("REGISTRATION SUCCESSFUL");
    window.location.replace("/");
  }

  render() {
    return (
      <div className="container">
        <h1>Register</h1>
        <RegisterHelper onRegister={this.onRegister} />
      </div>
    )
  }
}
