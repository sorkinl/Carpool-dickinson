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
import SearchPage from "./pages/Search/SearchPage";
import Loading from "./components/Loading";
import { withRouter } from "react-router-dom";
import MainPage from "./pages/FrontPage/MainPage";
import SearchResult from "./components/SearchResults/SearchResult";
import Dashboard from "./pages/Dashboard/Dashboard";
import EditProfile from "./components/Account/Profile/EditProfile";
import PostTrip from "./components/CreateTrip/PostTrip";
import FancyLoader from "./components/CreateTrip/FancyLoader (not in use)";
import Profile from "./components/Account/Profile/Profile";
import TripsContainer from "./pages/Trips/TripsContainer";
import BookmarksContainer from "./pages/Bookmarks/BookmarksContainer";

const Routes = withRouter(({ location }) => {
  return (
    <div>
      {/* location.pathname!=="/frontpagetrial" &&    <NavBar />  */}
      <Switch>
        <Route path="/" exact component={MainPage} />
        <PrivateRoute path="/search" exact component={SearchPage} />
        <PrivateRoute path="/trips" component={TripsContainer} />
        <PrivateRoute path="/bookmarks" component={BookmarksContainer} />
        <PrivateRoute path="/account" component={Account} />
        <PrivateRoute path="/edit-profile" component={EditProfile} />
        {/* <PrivateRoute path="/chat" component={MainChat} /> */}
        <PrivateRoute exact path="/chat" component={MainChat} />
        <PrivateRoute path="/chat/:chatId" component={MainChat} />
        <Route path="/loading" component={Loading} />
        <Route path="/logIn" component={LogIn} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/landingPage" component={LandingPage} />
        <PrivateRoute path="/edit/:tripId" component={EditForm} />
        <Route path="/verifyEmail" component={EmailVerify} />
        <Route path="/registrationForm" component={ProfileCreate} />
        <PrivateRoute path="/postTrip" component={PostTrip} />
        <Route path="/frontPageTrial" component={FrontPageFigma} />
        <Route path="/searchResult" exact component={SearchResult} />
        <Route path="/fancy" component={FancyLoader} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/users/:userId" component={Profile} />
      </Switch>
    </div>
  );
});
function App() {
  return (
    <div className="App">
      <Router>
        <Routes />
      </Router>
    </div>
  );
}

export default App;
