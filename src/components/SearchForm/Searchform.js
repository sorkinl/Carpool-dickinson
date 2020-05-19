import React, { Component } from 'react';
import { render } from '@testing-library/react';
import Searchbar from './Searchbar';
import {BrowserRouter as Router, Link, useRouteMatch, useParams, Switch, Route} from 'react-router-dom';
import SearchResult from '../SearchResults/SearchResult';

const SearchForm = () =>{
    
    // no need for the state in this component, since the state is managed in the bar.
    // handleCreate is responsible for showing state in the console, but can be very easily done in 
    // the SearchBar. This seems better as it is called from parent.
    const handleCreate = (data) => {  
        // this.setState({
        //     information: information.concat({ id: this.id++, ...data })
        // }) 
        console.log(data);
    }
        //I was attempting to show results with this, but it doesn't work for now
        let match = useRouteMatch();
        return (
            <div>
                Welcome
                <Link to={`${match.url}/results`}>
                <Searchbar 
                    onCreate={handleCreate}
                />
                </Link>
                <Switch>
                    <Route path={`${match.path}/results`}>
                        <SearchResult/>
                    </Route>
                </Switch>
            </div>
        )
    }


export default SearchForm;