import React, {Component} from 'react';
import { BrowserRouter } from 'react-router-dom'

import SearchBox from '../components/SearchBox'
import SearchAndList from '../containers/SearchAndList'
import Recipe from '../components/Recipe'

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <SearchAndList />
      </div>
    )
  }
}

export default Home;
