import React, {Component} from 'react';
import CreateRecipeModal from '../components/CreateRecipeModal';
import NavBar from '../components/NavBar'

import UserService from '../services/UserService'
import UserInfo from './UserInfo'

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
    console.log(this.state.user);
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
          <NavBar/>
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <h1>Hello, { this.state.user.firstName ? this.state.user.firstName : this.state.user.username }</h1>
                <button className="btn btn-success pull-right" onClick={this.openCreateModal}>Create Recipe</button>
                <CreateRecipeModal isOpen={this.state.createModalOpen}
                                   onHide={this.closeCreateModal}
                                   userId={this.state.user.id}/>
              </div>
            </div>
            <UserInfo user={this.state.user} />
          </div>
        </div>
      )
    }
    return <div>Please log in!</div>
  }
}

export default Profile;
