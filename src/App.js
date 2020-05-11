import React from 'react';
import './App.css';
import SearchResults from './components/SearchResults'



//temp function to load search Results


function App() {

const [showResults, setShowResults] = React.useState(false)


  return (
    <div className="App">
     {showResults?<SearchResults/>:null}
      {/* button to load search results*/}
      <button onClick={ 
        () => setShowResults(true) }>
        search results button
      </button>

    </div>
  );
}

export default App;
