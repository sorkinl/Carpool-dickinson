import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { connect } from 'react-redux';
import AccountIcon from "./AccountIcon"
import {toggleLogin} from '../../../js/actions/index';
import DriveEtaIcon from '@material-ui/icons/DriveEta';

import {   Redirect,   Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import actions from './duck/actions'
import { NavigateBeforeRounded } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: 'white',
    textDecoration: "none"
  },
  appBar:{
      zIndex: 3,
  }
}));

const mapStateToProps = state => {
  return {loggedIn: state.loggedIn}
}
const mapDispatchToProps = (dispatch) => {
  return {
    toggleLogin: () => dispatch(toggleLogin({word:"allowed"}))
  }
}
 function NavBar({loggedIn, toggleLogin}) {
  const classes = useStyles();
  //redux hook 
  /* const auth = useSelector(state => state.auth);
  const dispatch = useDispatch() */

  

  /* const login =()=>{
    return  <AccountIcon />
  }
  const logOff = () => {
   
    return <Redirect to='/' />
    
  } */

  return (

    <div className={classes.root}>
      {/* controls login button */}
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={loggedIn} onChange={toggleLogin/* 
            if(auth){    
              dispatch(actions.logoff())
            }else{
              // dispatch(actions.login)
              dispatch(actions.login())
            }        */
          } 
           aria-label="login switch" />}
           label={loggedIn ? 'Logout' : 'Login'} 
        />
      </FormGroup>

      <AppBar className={classes.appBar} position="fixed">
        <Toolbar>
          
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <DriveEtaIcon />
          </IconButton>

          <Link className={classes.title} to="/">Carpool</Link>
             
          <Button component={Link} to="/logIn" edge="start" className={classes.menuButton} color="inherit" aria-label="menu" variant="outlined">Log in</Button>
          <Button component={Link} to="/signUp" edge="start" className={classes.menuButton} color="inherit" aria-label="menu" variant="outlined">Sign up</Button>


          {/* auth && login() */}
         
          {/* !auth && logOff() */}

        </Toolbar>
      </AppBar>
    </div>
    
    
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
