import React, {Component} from 'react';
import CreateRecipeModal from '../components/CreateRecipeModal';

import UserService from '../services/UserService'

class UserEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      updateUsers: null
    };

    this.userService = UserService.instance;
    this.handleAdminCheck = this.handleAdminCheck.bind(this);
    this.handleChefCheck = this.handleChefCheck.bind(this);
    this.saveUser = this.saveUser.bind(this);
  }

  componentDidMount() {
    this.setState({user: this.props.user});
    this.setState({updateUsers: this.props.updateUsers});
  }

  handleAdminCheck(evt) {
    console.log(evt.target.value);
    this.setState({user: {...this.state.user, admin: !this.state.user.admin}});
  }

  handleChefCheck(evt) {
    this.setState({user: {...this.state.user, chef: !this.state.user.chef}});
  }

  saveUser() {
    this.userService.saveUser(this.state.user.id, this.state.user)
                    .then(() => {
                      if(typeof(this.state.updateUsers === "function")) {
                        this.state.updateUsers();
                      }
                    });
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
           <td>
             <div onClick={this.saveUser}>Save</div>
           </td>
           <td>
             <div onClick={this.deleteUser}>Delete</div>
           </td>
        </tr>)
    }
    else {
      return <tr><td>No user!</td></tr>
    }
  }
}

export default UserEntry;
