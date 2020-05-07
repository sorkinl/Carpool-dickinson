import React from 'react';
import './App.css';
import SearchResults from './components/SearchResults'
import { render } from '@testing-library/react';


//temp function to load search Results
function renderSearchResults(){
  console.log("works")
  render (
    
    <SearchResults />

  );
}

function App() {




  return (
    <div className="App">
     
      {/* button to load search results*/}
      <button onClick={ 
        renderSearchResults }>
        search results button
      </button>

    </div>
  );
}

export default App;
