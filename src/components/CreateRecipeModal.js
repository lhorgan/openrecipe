import React from 'react';
import Modal from 'react-bootstrap-modal';
import IngredientList from './IngredientList';

export default class CreateRecipeModal extends React.Component {

  constructor(props) {
    super(props);

    this.saveRecipe = this.saveRecipe.bind(this);
  }

  saveRecipe() {
    console.log("recipe save button clicked!");
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header>
          <Modal.Title id='ModalHeader'>Create a Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <IngredientList/>
          <div className="form-group">
            <label htmlFor="instructions">instructions</label>
            <textarea className="form-control" id="instructions"
                      placeholder="add your instructions here..."/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Dismiss className="btn btn primary" onClick={this.saveRecipe}></Modal.Dismiss>
        </Modal.Footer>
      </Modal>
    );
  }
}
