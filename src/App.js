import React from 'react';
import './App.css';
import SearchResult from './components/SearchResults/SearchResult'
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

    </div>
  );
}

export default App;
