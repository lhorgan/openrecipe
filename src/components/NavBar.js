import React from 'react'
import { Link } from 'react-router-dom';

export default class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.profileOrLogin = this.profileOrLogin.bind(this);
  }

  profileOrLogin() {
    if (this.props.user) {
      return (
        <Link to={`/profile`}>Hi, {this.props.user.username}</Link>
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
