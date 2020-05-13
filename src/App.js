import React from 'react';
import './App.css';
import SearchResult from './components/SearchResults/SearchResult'
import ChatWindow from './components/Chat/ChatWindow';
import {Profile, Button, EditPage} from './component/Account/Profile';


//temp function to load search Results
<<<<<<< HEAD
<<<<<<< HEAD

=======
=======

>>>>>>> upstream/master
// test pull
// test pull 2
// test pull 3
// test pull 4
<<<<<<< HEAD
>>>>>>> d78af177281537a99cc65a7c1baa2475f7558cbb
=======
>>>>>>> upstream/master

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
