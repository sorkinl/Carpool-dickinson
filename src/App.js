import React from 'react';
import './App.css';
import SearchResult from './components/SearchResults/SearchResult'
import { render } from '@testing-library/react';
import ChatWindow from './components/Chat/ChatWindow';
import NavBar from './components/NavBar/NavBar';
import { Switch, Link, Route, BrowserRouter as Router } from 'react-router-dom';
import SearchForm from './components/SearchForm/Searchform';
//import { Profile, EditPage, Button } from './components/Account/Profile';

import Profile from './components/Account/Profile/Profile.js';
import TripList from './components/Account/Trips/TripList.js';
import MainChat from './components/Chat/MainChat';
import SearchButton from './components/SearchForm/SearchButton';



//temp function to load search Results
// test pull
// test pull 2
// test pull 3
// test pull 4

function App() {

const [showResults, setShowResults] = React.useState(false)


  return (
    <div className="App">
      
      <Router>
        <div>
      <NavBar/>
        
        <hr />
        <main>
          
        </main>
        <Switch>
          <Route path="/" exact component={SearchButton}/>
          <Route path="/search" component={SearchForm} />
          <Route path="/profile" component={Profile}/>
          <Route path="/chat" component={MainChat}/>
        </Switch>
          </div>
      </Router>
    </div>

  );
}

export default App;
