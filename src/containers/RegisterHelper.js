import React from 'react';
import UserService from '../services/UserService'
import { Link } from 'react-router-dom'

class RegisterHelper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: '',
        password: '',
        firstName: '',
        lastName: ''
      },
      verifiedPassword: ''
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleVerifyPassword = this.handleVerifyPassword.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.userService = UserService.instance;
    this.isEmpty = this.isEmpty.bind(this);
  }

  componentDidMount() {
    this.setState({onRegister: this.props.onRegister});
  }

  handleFirstNameChange(event) {
    this.setState({user: {...this.state.user, firstName: event.target.value}});
    console.log(this.state.user);
  }

  handleLastNameChange(event) {
    this.setState({user: {...this.state.user, lastName: event.target.value}});
    console.log(this.state.user);
  }

  handleUsernameChange(event) {
    this.setState({user: {...this.state.user, username: event.target.value}});
    console.log(this.state.user);
  }

  handlePasswordChange(event) {
    this.setState({user: {...this.state.user, password: event.target.value}});
    console.log(this.state.user);
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
    else if (this.state.user.username === "") {
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
              //alert("HEHEHEHEHEHE");
              if(typeof(this.state.onRegister) === "function") {
                this.state.onRegister();
              }
            }
        });
    }
  }

  render() {
    return (
      <div className="container-fluid">
        {/*<h1>Register</h1>*/}
        <div>
          <label>First Name:</label>
          <input className="form-control" value={this.state.user.firstName} onChange={this.handleFirstNameChange} />
        </div>
        <div>
          <label>Last Name:</label>
          <input className="form-control" value={this.state.user.lastName} onChange={this.handleLastNameChange} />
        </div>
        <div>
          <label>Username:</label>
          <input className="form-control" value={this.state.user.username} onChange={this.handleUsernameChange} />
        </div>
        <div>
          <label>Password:</label>
          <input className="form-control" value={this.state.user.password} onChange={this.handlePasswordChange} />
        </div>
        <div>
          <label>Verify Password:</label>
          <input className="form-control" value={this.state.verifiedPassword} onChange={this.handleVerifyPassword} />
        </div>
        <div>
          <button onClick={this.registerUser} className="btn btn-primary btn-block mt-2" type="button">
            Register
          </button>
        </div>
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

export default RegisterHelper;
