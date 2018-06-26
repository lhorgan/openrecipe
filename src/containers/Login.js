import React from 'react';
import { Link } from 'react-router-dom'

import UserService from '../services/UserService'

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
    //console.log(this.state.user)
  }

  handlePasswordChange(event) {
    this.setState({user: {...this.state.user, password: event.target.value}});
    //console.log(this.state.user)
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
      /*.then((response) => {
         return response.text().then(text => {
          return text ? JSON.parse(text) : {}
        })
      })*/
      .then(user => {
        this.props.history.push({
          pathname: '/profile',
          /*state: { user: user }*/
        })
      });
  }

  render() {
    return (
      <div className="container">
        <h1>Login</h1>
        <div>
          <form>
            <div className="form-group">
              <label>Username:</label>
              <input className="form-control" value={this.state.user.username} onChange={this.handleUsernameChange} />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input className="form-control" value={this.state.user.password} onChange={this.handlePasswordChange} />
            </div>
            <div className="form-group">
              <button onClick={this.loginUser} className="btn btn-primary btn-block" type="button">
                Sign In
              </button>
            </div>
            <Link to={`/register`}>Register</Link>
            <Link to={`/`} className="float-right">Home</Link>
          </form>
        </div>
      </div>
    )
  }
}

export default Login;
