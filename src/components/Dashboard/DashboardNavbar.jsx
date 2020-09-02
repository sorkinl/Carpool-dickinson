import React, {useState} from 'react'
import logo from "../../assets/images/logo.png";
import icon from "../../assets/sprite.svg";
import avatar from "../../static/img/avatar.png";
import { Link } from 'react-router-dom';
import firebase from '../../firebase/firebaseConfig';
import AutoInput from '../HOC/AutoSuggest';
const DashboardNavbar = () => {
  const [date, setDate] = useState(new Date);
  const [modal, setModal] = useState(false)
    return (
      <>
      {/* <Modal open={modal} onClose={() => setModal(false)} center classNames={{
        modal: "modal-search"
      }}>
        <h1>Where do you want to go?</h1>
      <form action="#" className="modal-search__form">
            <input
              type="text"
              className="modal-search__input"
              placeholder="To..."
            />
            <input
              type="text"
              className="modal-search__input"
              placeholder="From..."
            />
            <input
              type="date"
              className="modal-search__input"
              value={new Date().toLocaleDateString('en-Ca')}
            />
            <Link to="/search" className="modal-search__button">
              {/* <svg className="modal-search__icon">
                <use xlinkHref={`${icon}#icon-magnifying-glass`}></use>
              </svg> }
              Search
              </Link>
          </form>
      </Modal> */}
        <header className="header-dashboard">
          
          <Link to="/dashboard">
          <img src={logo} alt="logo" className="logo-dashboard" />
          </Link>
          <form action="#" className="search-dashboard">
          <Link to="/search" className="search-dashboard__button-icon">
              <svg className="search-dashboard__icon">
                <use xlinkHref={`${icon}#icon-magnifying-glass`}></use>
              </svg>
              </Link>
          <AutoInput/>
          <div className="verticalLine"></div>
            <AutoInput/>
              <Link className="search-dashboard__button">
                Find
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