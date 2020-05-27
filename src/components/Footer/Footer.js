import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import "./Footer.css"

import { AppBar,Toolbar } from '@material-ui/core';

/* New attempt at footer code */
const Footer = () => {
  return(
      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-row">
            <div className="footer-col">
              <h4> Dickinson College Carpool Crew </h4>
              <ul className="footer-list">
                <li> Carlisle, PA </li>
                <li> 28 N College St </li>
                <li> Dickinson College </li>
              </ul>
            </div>
            <span className="footer-spacing"></span>
            <div className="footer-col">
              <h4> Site Map </h4>
              <ul className="footer-list">
                <li><a href="../App.js"> Home </a></li>
                /* Not sure of how to link Log In and Sign Up */
                <li> Log In </li>
                <li> Sign Up </li>
              </ul>
            </div>
          </div>
          <div className="footer-row">
            <p> &copy;{new Date().getFullYear()} | Dickinson College Carpool Crew | All rights reserved</p>
          </div>
        </div>
      </div>
    )
}
export default Footer;


/* Previous attempt at footer code */
/* const useStyles = makeStyles((theme) => ({
    footer: {
        top: 'auto',
        height:20,
        bottom: 0,
        position:"relative"
      },
})); */


/* export default function MenuAppBar() {
    const classes = useStyles();
  return (
    <div>
      { <AppBar classes = {{root:classes.footer}}>
          <Toolbar>
              dasdas
          </Toolbar>
        
      </AppBar> }
    </div>
  );
} */