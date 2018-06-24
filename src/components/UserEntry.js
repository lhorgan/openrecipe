import React, {Component} from 'react';
import CreateRecipeModal from '../components/CreateRecipeModal';

import UserService from '../services/UserService'

class UserEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };

    this.userService = UserService.instance;
    this.handleAdminCheck = this.handleAdminCheck.bind(this);
    this.handleChefCheck = this.handleChefCheck.bind(this);
  }

  componentDidMount() {
    this.setState({user: this.props.user});
  }

  handleAdminCheck(evt) {
    console.log(evt.target.value);
    this.setState({user: {...this.state.user, admin: !this.state.user.admin}});
  }

  handleChefCheck(evt) {
    this.setState({user: {...this.state.user, chef: !this.state.user.chef}});
  }

  render() {
    if(this.state.user) {
      return (<tr>
           <td>
            { this.state.user.username }
           </td>
           <td>
            <input type="checkbox" checked={ this.state.user.admin } onChange={this.handleAdminCheck} />
           </td>
           <td>
            <input type="checkbox" checked={ this.state.user.chef } onChange={this.handleChefCheck} />
           </td>
        </tr>)
    }
    else {
      return <tr><td>No user!</td></tr>
    }
  }
}

export default UserEntry;
