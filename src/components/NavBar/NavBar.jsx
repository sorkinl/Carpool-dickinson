import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import AccountIcon from "./AccountIcon";
import { toggleLogin } from "../../redux/actions/authActions";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavigateBeforeRounded } from "@material-ui/icons";
import uride from "../../static/img/uride.png"
import firebase from "../../firebase/firebaseConfig";
import { Button, CardMedia, Typography, Box,} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  //menuButton: {
  //  marginRight: theme.spacing(2),
  //},
  title: {
    flexGrow: 1,
    color: "white",
    textDecoration: "none",
  },
  appBar: {
    //zIndex: 3,
    background: '#F7F5F5',
  },
  logIn: {
    position: 'absolute',
    width: '102px',
    height: '37px',
    right: '171px',
    top: '10px',
    background: '#F7F5F5',
    border: '1px solid #000000',
    boxSizing: 'border-box',
    borderRadius: '10px',
    //fontFamily: 'Abhaya Libre',
    fontStyle: 'normal',
   // fontWeight: 'bold',
    fontSize: '15px',
    lineHeight: '26px',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    color: '#000000',
    },
  signUp: {
    position: 'absolute',
    width: '102px',
    height: '37px',
    right: '48.5px',
    top: '10px',
    background: '#F7F5F5',
    border: '2px solid #C50505',
    boxSizing: 'border-box',
    borderRadius: '10px',
     //fontFamily: 'Abhaya Libre',
     fontStyle: 'normal',
     // fontWeight: 'bold',
      fontSize: '15px',
      lineHeight: '26px',
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      color: '#000000',
    },
    uride: {
      position: 'absolute',
      height: '34px',
      width: '88px',
      left: '31px',
      top: '13px',

    },

 
}));


const NavBar = () => {
  const classes = useStyles();
  const auth = useSelector((state) => state.firebase.auth);
  const dispatch = useDispatch();

  const links = auth.uid ? (
    <AccountIcon />
  ) : (
    <>
      <Button
        component={Link}
        to="/logIn"
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        variant="outlined"
      >
        Log in
      </Button>
      <Button
        component={Link}
        to="/signUp"
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        variant="outlined"
      >
        Sign up
      </Button>
    </>
  );


  
  return (
    <div className={classes.root}>
      {/* controls login button */}
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={!!auth.uid}
              onChange={() => dispatch(toggleLogin({ word: "allowed" }))}
              aria-label="login switch"
            />
          }
          label={auth.uid ? "Logout" : "Login"}
        />
      </FormGroup>
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            {/* <DriveEtaIcon /> *
          </IconButton> */}

          {/* <Link className={classes.title} to="/">Carpool</Link> */}

          <CardMedia
            className={classes.uride}
            image={uride}
            title="uride"
            /> 

         
          {links}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
