import React, {Component} from 'react';
import CreateRecipeModal from '../components/CreateRecipeModal';

import UserService from '../services/UserService'

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      createModalOpen: false
    };

    this.userService = UserService.instance;
    //this.userService.subscribeToUser(user => this.setState({user}));
    this.openCreateModal = this.openCreateModal.bind(this);
    this.closeCreateModal = this.closeCreateModal.bind(this);
  }

  componentDidMount() {
    //this.setState({user: this.props.location.state.user});
    /*this.userService.getLoggedInUser()
                    .then(user => {
                      console.log("profile received user " + JSON.stringify(user));
                      this.setState({user: user});
                    });*/
    this.userService.subscribeToUser(user => this.setState({user}));
  }

 openCreateModal() {
   this.setState({createModalOpen: true});
 }

 closeCreateModal() {
   this.setState({createModalOpen: false});
 }

  render() {
    if(this.state.user) {
      return (
        <div>
          <h1>Hello, user {this.state.user.id}: {this.state.user.username}!</h1>
          <button className="btn btn-default" onClick={this.openCreateModal}>Create Recipe</button>
          <CreateRecipeModal isOpen={this.state.createModalOpen}
                             onHide={this.closeCreateModal}
                             userId={this.state.user.id}/>
        </div>
      )
    }
    return <div>Please log in!</div>
  }
}

export default Profile;
