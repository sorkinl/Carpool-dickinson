import React from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer'
import { Switch, Link, Route, BrowserRouter as Router } from 'react-router-dom';
import SearchForm from './components/SearchForm/Searchform';

import Account from './components/Account/Account';
import MainChat from './components/Chat/MainChat';
import SearchButton from './components/SearchForm/SearchButton';
import LogInForm from './components/LogInForm/LogIn';



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
          <Route path="/account" component={Account}/>
          <Route path="/chat" component={MainChat}/>
          <Route path="/logInForm" component={LogInForm}/>
        </Switch>
          </div>
      </Router>

      <Footer />
    </div>

  );
}

export default App;
