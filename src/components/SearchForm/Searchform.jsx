import React, { Component } from 'react';
import Searchbar from './Searchbar';
import {BrowserRouter as Router, Link, useRouteMatch, Switch, Route} from 'react-router-dom';
import SearchResult from '../SearchResults/SearchResult';

const SearchForm = () =>{
    const handleCreate = data => {
        console.log(data);
    }
        let match = useRouteMatch();
        return (
            <div>
                Welcome
                <Link to={`${match.url}/results`}>
                <Searchbar onCreate={handleCreate} />
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