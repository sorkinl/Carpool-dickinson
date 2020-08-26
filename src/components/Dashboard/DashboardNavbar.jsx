import React, {useState} from 'react'
import logo from "../../assets/images/logo.png";
import icon from "../../assets/sprite.svg";
import avatar from "../../static/img/avatar.png";
import { Link } from 'react-router-dom';
import firebase from '../../firebase/firebaseConfig';
import 'react-responsive-modal/styles.css';
import {Modal} from 'react-responsive-modal';
const DashboardNavbar = () => {
  const [date, setDate] = useState(new Date);
  const [modal, setModal] = useState(true)
    return (
      <>
      {/* <Modal open={modal} center>
        Hi
      </Modal> */}
        <header className="header-dashboard">
          <Link to="/dashboard">
          <img src={logo} alt="logo" className="logo-dashboard" />
          </Link>
          <form action="#" className="search-dashboard">
            <input
              type="text"
              className="search-dashboard__input"
              placeholder="To..."
            />
            <input
              type="text"
              className="search-dashboard__input"
              placeholder="From..."
            />
            <input
              type="date"
              className="search-dashboard__input"
              value={new Date().toLocaleDateString('en-Ca')}
            />
            <Link to="/search" className="search-dashboard__button">
              <svg className="search-dashboard__icon">
                <use xlinkHref={`${icon}#icon-magnifying-glass`}></use>
              </svg>
              </Link>
          </form>

          <nav className="user-nav">
            <div className="user-nav__icon-box">
              <svg className="user-nav__icon">
                <use xlinkHref={`${icon}#icon-bookmark`}></use>
              </svg>
              <span className="user-nav__notification">7</span>
            </div>
            <Link to="/chat">
            <div className="user-nav__icon-box">
              <svg className="user-nav__icon">
                <use xlinkHref={`${icon}#icon-chat`}></use>
              </svg>
              <span className="user-nav__notification">7</span>
            </div>
            </Link>
            <Link to={`/users/${firebase.auth().currentUser.uid}`}>
            <div className="user-nav__user">
              <img src={avatar} alt="" className="user-nav__user-photo" />
              <span className="user-nav__user-name">Leonid</span>
            </div>
            </Link>
          </nav>
        </header>
        </>
    )
}

export default DashboardNavbar