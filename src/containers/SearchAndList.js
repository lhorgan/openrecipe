import React, {Component} from 'react'
import SearchBox from '../components/SearchBox'
import { Link } from 'react-router-dom'

class SearchAndList extends Component {
    constructor(props) {
        super(props);

        this.state = {"results": []};

        this.listResults = this.listResults.bind(this);
    }

    listResults(results) {
        console.log("listing results!");
        this.setState({"results": results});
        console.log(results);
    }

    render() {
        return (<div>
                  <SearchBox searchComplete={this.listResults} />
                  <ol>
                  {this.state.results.map((result, idx) => {
                    let rid = result.recipe.id;
                    if(result.recipe.uri) {
                      rid = encodeURIComponent(result.recipe.uri);
                    }
                    //let encoded = encodeURIComponent(result.recipe.uri);
                    return <div key={idx}>
                             {/*<Link to={{pathname: '/recipe', state: {recipe: result.recipe}}}>
                               {result.recipe.label}
                             </Link>*/}
                             <Link to={`/recipe/fancy/${rid}`}> { result.recipe.label }</Link>
                           </div>
                  })}
                  </ol>
                </div>)
    }
}

export default SearchAndList;
