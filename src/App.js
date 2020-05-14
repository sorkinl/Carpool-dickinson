import React from 'react';
import './App.css';
import SearchResult from './components/SearchResults/SearchResult'
import { render } from '@testing-library/react';
import ChatWindow from './components/Chat/ChatWindow';
import Profile from './components/Account/Profile/Profile.js';
import TripList from './components/Account/Trips/TripList.js';



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
      <Profile/>
      <TripList/>
    </div>

  );
}

export default App;
