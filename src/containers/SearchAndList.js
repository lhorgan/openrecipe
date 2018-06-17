import React, {Component} from 'react'
import SearchBox from '../components/SearchBox'

class SearchAndList extends Component {
    constructor(props) {
        super(props);
        this.listResults = this.listResults.bind(this);
    }

    listResults(results) {
        console.log("listing results!");
        console.log(results);
    }

    render() {
        return (<div>
                  <SearchBox searchComplete={this.listResults} />
                </div>);
    }
}

export default SearchAndList;
