import React from 'react';
import './App.css';
import SearchResult from './components/SearchResults/SearchResult'
import { render } from '@testing-library/react';
import ChatWindow from './components/Chat/ChatWindow';
import {Profile, Button, EditPage} from './component/Account/Profile';


//temp function to load search Results
<<<<<<< HEAD

=======
// test pull
// test pull 2
// test pull 3
// test pull 4
>>>>>>> d78af177281537a99cc65a7c1baa2475f7558cbb

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
