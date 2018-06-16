import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import IngredientList from './IngredientList';

export default class CreateRecipeModal extends React.Component {

  constructor(props) {
    super(props);

    this.saveRecipe = this.saveRecipe.bind(this);
    Modal.setAppElement("#root");
  }

  saveRecipe() {
    console.log("recipe save button clicked!");
  }

  render() {
    return (
      <div className="modal fade">
      <Modal isOpen={this.props.isOpen}
             onRequestClose={this.props.onHide}
             contentLabel="Create Recipe Modal"
             className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Write your recipe: </h4>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          </div>
          <div className="modal-body">
            <IngredientList/>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" onClick={this.props.onHide}>Cancel</button>
            <button type="button" className="btn btn-primary btn-submit"
                    onClick={this.saveRecipe} data-dismiss="modal">Create Recipe</button>
          </div>
        </div>
      </Modal>
      </div>
    );
  }
}
