import React from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Searchbar from "./components/SearchResults/Searchbar";
import Account from "./components/Account/Account";
import MainChat from "./components/Chat/MainChat/MainChat";
import FrontPage from "./pages/frontpage";
import FrontPageFigma from "./pages/frontpageFigma";
import LogIn from "./components/LogInForm/LogIn";
import SignUp from "./components/LogInForm/SignUp";
import LandingPage from "./components/LogInForm/LandingPage";
import ProfileCreate from "./components/LogInForm/ProfileCreate";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import EditForm from "./components/Account/Trip-new/editform";
import EmailVerify from "./components/LogInForm/EmailVerify";
import SearchPage from "./pages/SearchPage/SearchPage"
import Loading from './components/Loading'
import PostRideField from "./components/CreateTrip/PostRideField";
import ConfirmField from "./components/CreateTrip/ConfirmField";
import { withRouter } from 'react-router-dom';
import MainPage from "./pages/FrontPage/MainPage";
import SearchResult from "./components/SearchResults/SearchResult"
import Dashboard from "./pages/Dashboard/Dashboard";
import EditProfile from "./components/Account/Profile/EditProfile";
import PostTrip from "./components/CreateTrip/PostTrip";


const Routes = withRouter(({location})=>{ 
  return (
    <div>
          { /* location.pathname!=="/frontpagetrial" &&    <NavBar />  */}
          <Switch>
            <Route path="/" exact component={MainPage} />
            <Route path="/search" component={SearchPage} />
            <PrivateRoute path="/account" component={Account} />
            <PrivateRoute path="/edit-profile" component={EditProfile}/>
            <PrivateRoute path="/chat" component={MainChat} />
            <Route path="/loading" component={Loading} />
            <Route path="/logIn" component={LogIn} />
            <Route path="/signUp" component={SignUp} />
            <Route path="/landingPage" component={LandingPage} />
            <PrivateRoute path="/edit/:tripId" component={EditForm} />
            <Route path="/verifyEmail" component={EmailVerify}/>
            <Route path="/registrationForm" component={ProfileCreate} />
            <PrivateRoute path = "/postRide" component = {PostRideField}/>
            <PrivateRoute path = "/postTrip" component = {PostTrip}/>
            <PrivateRoute path = "/postRide/confirm" component = {ConfirmField}/>
            <Route path = "/frontPageTrial" component = {FrontPageFigma}/>
            <Route path = "/searchResult" component = {SearchResult}/>
            <Route path = "/dashboard" component = {Dashboard}/>
          </Switch>
        </div>
  )
})
function App() {
  return (
    <div className="App">
      <Router>
        <Routes/>
      </Router>
    </div>
  );
}

export default App;
