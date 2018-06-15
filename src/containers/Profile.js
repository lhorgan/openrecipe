import React, {Component} from 'react';
import { BrowserRouter } from 'react-router-dom'

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    this.setState({user: this.props.location.state.user});
  }

  render() {
    return (
      <div>
        <h1>{this.state.user.username}</h1>
      </div>
    )
  }
}

export default Profile;
