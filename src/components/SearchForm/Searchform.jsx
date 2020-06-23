import React from 'react';
import Searchbar from './Searchbar';
// import { Link, useRouteMatch, Switch, Route} from 'react-router-dom';
// import SearchResult from '../SearchResults/SearchResult';

const SearchForm = () =>{
    //handleCreate will be passed down to child as a prop
    const handleCreate = data => {
        // console.log(data);
    }
        //Moved Link to SearchBar
        // let match = useRouteMatch();
        return (
            <div>
                Welcome
                {/* <Link to={`${match.url}/results`}> */}
                <Searchbar onCreate={handleCreate} />
                {/* </Link> */}
                {/* <Switch>
                    <Route path={`${match.path}/results`}>
                        <SearchResult/>
                    </Route>
                </Switch> */}
            </div>
        )
    }


export default SearchForm;