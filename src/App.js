import React from 'react';
import './App.css';
import SearchResult from './components/SearchResults/SearchResult'
import ChatWindow from './components/Chat/ChatWindow';



//temp function to load search Results
// test pull


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

    </div>
  );
}

export default App;
