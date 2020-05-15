import React, { Component } from 'react';
import { render } from '@testing-library/react';
import Searchbar from './Searchbar';
import {BrowserRouter as Router, Link, useRouteMatch, useParams, Switch, Route} from 'react-router-dom';
import SearchResult from '../SearchResults/SearchResult';

const SearchForm = () =>{
    
    const [state, setState] = React.useState({
        information: [
            {
                id: 0,
                pickup: '',
                destination: '',
                startDate: new Date(),
            }
        ],
        keyword: ''
    });
    const handleCreate = (data) => {
        const { information } = state;
        // this.setState({
        //     information: information.concat({ id: this.id++, ...data })
        // }) 
        console.log(data);
    }
        let match = useRouteMatch();
        return (
            <div>
                Welcome
                <Link to={`${match.url}/results`}>
                <Searchbar />
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