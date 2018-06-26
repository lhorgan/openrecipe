import React, {Component} from 'react'
import { Link } from 'react-router-dom'

import UserService from '../services/UserService'
import RegisterHelper from './RegisterHelper'

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.onRegister = this.onRegister.bind(this);
    this.userService = UserService.instance;
  }

  onRegister() {
    window.location.replace("/");
  }

  render() {
    return (
      <div className="container">
        <h1>Register</h1>
        <RegisterHelper onRegister={this.onRegister} />
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
