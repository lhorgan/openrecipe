import React, {Component} from 'react';
import { BrowserRouter } from 'react-router-dom'

class SearchBox extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (<div>
      <input type="text" placeholder="search" />
    </div>)
  }
}

export default SearchBox;