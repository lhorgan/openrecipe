import React from 'react';
import IngredientList from './IngredientList';

export default class CreateRecipeModal extends React.Component {

  render() {
    return (
      <div>
        <IngredientList/>
        <div className="form-group">
          <label htmlFor="instructions">instructions</label>
          <textarea className="form-control" id="instructions"
                    placeholder="add your instructions here..."/>
        </div>
      </div>
    );
  }
}
