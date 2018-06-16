import React from 'react';
import Modal from 'react-modal';
import IngredientList from './IngredientList';
import RecipeService from '../services/RecipeService'

export default class CreateRecipeModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      ingredients: [],
      instructions: ""
    }

    this.recipeService = RecipeService.instance
    this.createRecipe = this.createRecipe.bind(this);
    this.setInstructions = this.setInstructions.bind(this);
    Modal.setAppElement("#root");
  }

  createRecipe() {
    console.log("recipe save button clicked!");
    this.recipeService.createRecipe(this.state, this.props.userId)
  }

  setInstructions(evt) {
    this.setState({instructions: evt.target.value});
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
            <button type="button" className="close"
                    onClick={this.props.onHide} aria-label="Close">
                    <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <IngredientList/>
            <div className="form-group">
              <label htmlFor="instructions">Instructions</label>
              <textarea className="form-control" id="instructions"
                        placeholder="add your instructions here..."
                        value={this.state.instructions}
                        onChange={this.setInstructions}/>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" onClick={this.props.onHide}>Cancel</button>
            <button type="button" className="btn btn-primary btn-submit"
                    onClick={() => {
                      this.createRecipe();
                      this.props.onHide();
                    }}>Create Recipe</button>
          </div>
        </div>
      </Modal>
      </div>
    );
  }
}
