import React from 'react';
import './App.css';
import SearchResult from './components/SearchResults/SearchResult'
import ChatWindow from './components/Chat/ChatWindow';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom';
import SearchForm from './components/SearchForm/Searchform';
//import { Profile, EditPage, Button } from './components/Account/Profile';


//temp function to load search Results

// test pull
// test pull 2
// test pull 3
// test pull 4

function App() {

const [showResults, setShowResults] = React.useState(false)


  return (
    <div className="App">
     {showResults?<SearchResult/>:<ChatWindow/>}
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
    </div>
  );
}

export default App;
