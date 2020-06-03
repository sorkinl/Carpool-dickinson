import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import AccountIcon from "./AccountIcon";
import SignIn from "../LogInForm/LogIn";
import { toggleLogin } from "../../redux/actions/authActions";
import DriveEtaIcon from "@material-ui/icons/DriveEta";

import { Redirect, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavigateBeforeRounded } from "@material-ui/icons";

import firebase from "../../firebase/firebaseConfig";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "white",
    textDecoration: "none",
  },
  appBar: {
    zIndex: 3,
  },
}));

/* const mapStateToProps = state => {
  return {loggedIn: state.loggedIn}
}
const mapDispatchToProps = (dispatch) => {
  return {
    toggleLogin: () => dispatch(toggleLogin({word:"allowed"}))
  }
} */

// above code is redux with classes
const NavBar = () => {
  const classes = useStyles();
  //redux hook
  // useSelector for taking the state out of the store.
  const loggedIn = useSelector((state) => state.authReducer.loggedIn);
  // useDispatch enables us to use redux dispatch function
  const dispatch = useDispatch();

  //show account icon if there exists current user
  //const links = firebase.auth().currentUser ? <AccountIcon /> : <Redirect to='/' />


  return (
    <div className={classes.root}>
      {/* controls login button */}
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={loggedIn}
              onChange={() => dispatch(toggleLogin({ word: "allowed" }))}
              aria-label="login switch"
            />
          }
          label={loggedIn ? "Logout" : "Login"}
        />
      </FormGroup>

      <AppBar className={classes.appBar} position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <DriveEtaIcon />
          </IconButton>

          <Link className={classes.title} to="/">Carpool</Link>


          { loggedIn? <AccountIcon/>:<><Button component={Link} to="/logIn" edge="start" className={classes.menuButton} color="inherit" aria-label="menu" variant="outlined">Log in</Button>
          <Button component={Link} to="/signUp" edge="start" className={classes.menuButton} color="inherit" aria-label="menu" variant="outlined">Sign up</Button></> }

        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
