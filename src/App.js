import React from 'react';
import './App.css';
import SearchResult from './components/SearchResults/SearchResult'
import { render } from '@testing-library/react';
import ChatWindow from './components/Chat/ChatWindow';

import { Link, Route, BrowserRouter as Router } from 'react-router-dom';
import SearchForm from './components/SearchForm/Searchform';
//import { Profile, EditPage, Button } from './components/Account/Profile';

import Profile from './components/Account/Profile/Profile.js';
import TripList from './components/Account/Trips/TripList.js';
import MainChat from './components/Chat/MainChat';




//temp function to load search Results
// test pull
// test pull 2
// test pull 3
// test pull 4

function App() {

const [showResults, setShowResults] = React.useState(false)


  return (
    <div className="App">
     {showResults?<SearchResult/>:<MainChat/>}
      {/* button to load search results*/}
      <button onClick={
        () => setShowResults(true) }>
        search results button
      </button>

      <Router>
        <Link to="/search">
          <button>Find a ride</button>
        </Link>
        <hr />
        <main>
          <Route path="/search" component={SearchForm} />
        </main>
      </Router>
      <Profile/>
      <TripList/>
    </div>

  );
}

export default App;
