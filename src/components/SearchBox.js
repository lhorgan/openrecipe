import React, {Component} from 'react';

import RecipeService from '../services/RecipeService'

class SearchBox extends Component {
  constructor(props) {
    super(props);

    this.state = {query: ""};

    this.recipeService = RecipeService.instance;

    this.updateQuery = this.updateQuery.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
      this.setState({"searchComplete": this.props.searchComplete});
  }

  updateQuery(evt) {
      //console.log(evt.target.value);
      this.setState({query: evt.target.value});
  }

  search(evt) {
      let query = this.state.query;
      this.recipeService.search(this.state.query).then((res) => {
          //console.log(res);
          if(typeof(this.state.searchComplete) === "function") {
              this.state.searchComplete(res.hits);
          }
          else {
              console.log(this.state.searchComplete);
          }
      });
  }

  render() {
    return (<div>
      <div className="input-group mb-3">
        <input type="text" className="form-control col-md-6" placeholder="search for a recipe..."
               onChange={this.updateQuery} value={this.state.query}/>
        <div className="input-group-append">
          <button className="btn btn-primary" type="button" onClick={this.search}>
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
    </div>)
  }
}

export default SearchBox;
