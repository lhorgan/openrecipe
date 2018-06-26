import React from 'react'
import { Link } from 'react-router-dom';
import UserService from '../services/UserService'

export default class NavBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {"user": null};

    this.profileOrLogin = this.profileOrLogin.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.userService = UserService.instance;
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.userService.subscribeToUser(user => this.setState({user}));
  }

  logout() {
    this.userService.logout();
  }

  profileOrLogin() {
    if (this.state.user && this.state.user.id) {
      return (
        <div>
          <Link to={`/profile`}>Hi, {this.state.user.username}</Link>
          <button className="btn btn-danger" style={{ margin: "5px" }}
                  onClick={this.logout}>Logout</button>
        </div>
      );
    } else {
      return (
        <span>
          <Link to={`/register`} className="btn btn-primary mr-2">Register</Link>
          <Link to={`/login`} className="btn btn-outline-primary">Login</Link>
        </span>
      );
    }
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
        <Link className="navbar-brand" to="/">OpenRecipe</Link>
        {this.profileOrLogin()}
      </nav>
    );
  }
}
