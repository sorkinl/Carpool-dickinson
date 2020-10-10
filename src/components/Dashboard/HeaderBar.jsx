import React, { useState } from "react";
import { useSelector } from 'react-redux';
import logo from "../../assets/images/DPool_logo.png";
import icon from "../../assets/sprite.svg";
import avatar from "../../static/img/avatar.png";
import { Link, useLocation, withRouter } from "react-router-dom";
import firebase from "../../firebase/firebaseConfig";
import AutoInput from "../HOC/AutoSuggest";
// import Popup from 'reactjs-popup';
import {
  Popover,
  Menu,
  MenuItem,
} from "@material-ui/core";
import ProfilePopper from "./ProfilePopper";

const HeaderBar = (props) => {

  const user = useSelector(state => state.firebase.profile);
  const [originData, setOriginData] = useState(null);
  const [destinationData, setDestinationData] = useState(null);

  const onDestinationSuggestionSelected = (data) => {
    setDestinationData(data);
  };
  
  const onOriginSuggestionSelected = (data) => {
    setOriginData(data);
  };
  const handleFind = (e) => {
    if (originData != null && destinationData != null) {
      e.preventDefault();
      props.history.push(
        `/search?originLat=${originData.position.lat}&originLong=${originData.position.lng}&destinationLat=${destinationData.position.lat}&destinationLong=${destinationData.position.lng}&originTitle=${originData.label}&destinationTitle=${destinationData.label}`
      );
    }
  }

  return (
    <>
      <header className="header-dashboard">
        <Link to="/dashboard">
          <img src={logo} alt="logo" className="logo-dashboard" />
        </Link>
        <form className="search-dashboard">
          <AutoInput
            onSuggestionSelected={onOriginSuggestionSelected}
            placeholder={"From..."}
          />
          <div className="verticalLine"></div>
          <AutoInput
            onSuggestionSelected={onDestinationSuggestionSelected}
            placeholder={"To..."}
          />
          <button onClick={handleFind} className="search-dashboard__button">
            Find
          </button>
        </form>
        <nav className="user-nav">
          <Link to="/bookmarks">
            <div className="user-nav__icon-box">
              <svg className="user-nav__icon">
                <use xlinkHref={`${icon}#icon-bookmark`}></use>
              </svg>
              <span className="user-nav__notification">7</span>
            </div>
          </Link>
          <Link to="/chat">
            <div className="user-nav__icon-box">
              <svg className="user-nav__icon">
                <use xlinkHref={`${icon}#icon-chat`}></use>
              </svg>
              <span className="user-nav__notification">7</span>
            </div>
          </Link>
          <ProfilePopper/>
        </nav>
      </header>
    </>
  );
};

export default withRouter(HeaderBar);