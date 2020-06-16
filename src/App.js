import React from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import SearchForm from "./components/SearchForm/Searchform";
import Account from "./components/Account/Account";
import MainChat from "./components/Chat/MainChat/MainChat";
import FrontPage from "./pages/frontpage";
import LogIn from "./components/LogInForm/LogIn";
import SignUp from "./components/LogInForm/SignUp";
import LandingPage from "./components/LogInForm/LandingPage";
import ProfileCreate from "./components/LogInForm/ProfileCreate";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import EditForm from "./components/Account/Trips/editform";
import EmailVerify from "./components/LogInForm/EmailVerify";



function App( {user} ) {
  return (
    <div className="App">
      <Router>
        <div>
          <NavBar />
          <hr />
          <main></main>
          <Switch>
            <Route path="/" exact component={FrontPage} />
            <Route path="/search" component={SearchForm} />
            <PrivateRoute path="/account" component={Account} />
            <PrivateRoute path="/chat" component={MainChat} />
            <Route path="/logIn" component={LogIn} />
            <Route path="/signUp" component={SignUp} />
            <Route path="/landingPage" component={LandingPage} />
            <Route path="/edit/:userId" component={EditForm} />
            <Route path="/verifyEmail" component={EmailVerify}/>
            <Route path="/registrationForm" component={ProfileCreate} />
          </Switch>
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
