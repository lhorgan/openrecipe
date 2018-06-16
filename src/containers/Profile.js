import React, {Component} from 'react';
import CreateRecipeModal from '../components/CreateRecipeModal';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      createModalOpen: false
    };

    this.openCreateModal = this.openCreateModal.bind(this);
    this.closeCreateModal = this.closeCreateModal.bind(this);
  }

  componentDidMount() {
    this.setState({user: this.props.location.state.user});
  }

 openCreateModal() {
   this.setState({createModalOpen: true});
 }

 closeCreateModal() {
   this.setState({createModalOpen: false});
 }

  render() {
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
}

export default Profile;
