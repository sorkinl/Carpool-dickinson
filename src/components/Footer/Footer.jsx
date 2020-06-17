import React from 'react';
import "./Footer.css"
import { BrowserRouter as Router } from 'react-router-dom';

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
                <Router>
                <li><a href="../App.js"> Home </a></li>
                </Router>
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

