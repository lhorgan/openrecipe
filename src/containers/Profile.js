import React, {Component} from 'react';
import CreateRecipeModal from '../components/CreateRecipeModal';
import NavBar from '../components/NavBar'

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
          <NavBar user={this.state.user}/>
          <div className="container">
            <div className="row">
              <h1>Hello, user {this.state.user.id}: {this.state.user.username}!</h1>
              <button className="btn btn-default" onClick={this.openCreateModal}>Create Recipe</button>
              <CreateRecipeModal isOpen={this.state.createModalOpen}
                                 onHide={this.closeCreateModal}
                                 userId={this.state.user.id}/>
            </div>
            <div className="row">
              <div className="col-sm-3">
                {/*left col*/}
                <ul className="list-group mb-2">
                  <li className="list-group-item text-muted">Profile</li>
                  <li className="list-group-item text-right"><span className="pull-left"><strong>Joined</strong></span>never</li>
                  <li className="list-group-item text-right"><span className="pull-left"><strong>Real name</strong></span>boop</li>
                </ul>
                <ul className="list-group">
                  <li className="list-group-item text-muted">Activity <i className="fa fa-dashboard fa-1x" />
                  </li>
                  <li className="list-group-item text-right"><span className="pull-left"><strong>Reviews</strong></span>3</li>
                  <li className="list-group-item text-right" style={{'cursor': 'pointer'}}>
                    <span className="pull-left"><strong>Followers</strong></span>3
                  </li>
                  <li className="list-group-item text-right" style={{'cursor': 'pointer'}}>
                    <span className="pull-left"><strong>Following</strong></span>3
                  </li>
                </ul>
              </div>
              <div className="col-sm-9">

              </div>
            </div>
          </div>
        </div>
      )
    }
    return <div>Please log in!</div>
  }
}

export default Profile;
