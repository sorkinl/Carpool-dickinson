import React from 'react'
import icon from "../../assets/sprite.svg";
import { Link } from 'react-router-dom';
import {
  faHome,
  faMapMarkerAlt,
  faCommentDots,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SideBar = () => {
    return (<nav className="sidebar-dashboard">
    <ul className="side-nav-dash">
      <li className="side-nav-dash__item side-nav-dash__item--active">
        <a href="/dashboard" className="side-nav-dash__link--active">
          {/* <svg className="side-nav-dash__icon">
            <use xlinkHref={`${icon}#icon-home`}></use>
          </svg> */}
          <FontAwesomeIcon className="side-nav-dash__icon" icon={faHome}></FontAwesomeIcon>
          <p>Home</p>
        </a>
      </li>
      <li className="side-nav-dash__item">
      <Link to="/chat" className="side-nav-dash__link">
          {/* <svg className="side-nav-dash__icon">
            <use xlinkHref={`${icon}#icon-location`}></use>
          </svg> */}
          <FontAwesomeIcon className="side-nav-dash__icon" icon={faCommentDots}></FontAwesomeIcon>
          <span>Chat room</span>
      </Link>
      </li>
      <li className="side-nav-dash__item">
      <Link to="#" className="side-nav-dash__link">
          {/* <svg className="side-nav-dash__icon">
            <use xlinkHref={`${icon}#icon-message`}></use>
          </svg> */}
          <FontAwesomeIcon className="side-nav-dash__icon" icon={faMapMarkerAlt}></FontAwesomeIcon>
          <span>My trips</span>
          </Link>
      </li>
      <li className="side-nav-dash__item">
        <Link to="/account" className="side-nav-dash__link">
          {/* <svg className="side-nav-dash__icon">
            <use xlinkHref={`${icon}#icon-user`}></use>
          </svg> */}
          <FontAwesomeIcon className="side-nav-dash__icon" icon={faUser}></FontAwesomeIcon>
          <span>Account</span>
        </Link>
      </li>

      <li className="side-nav-dash__item">
        <Link to="/posttrip" className="side-nav-dash__link">
          {/* <svg className="side-nav-dash__icon">
            <use xlinkHref={`${icon}#icon-user`}></use>
          </svg> */}
          <FontAwesomeIcon className="side-nav-dash__icon" icon={faUser}></FontAwesomeIcon>
          <span>Post Rides</span>
        </Link>
      </li>
    </ul>
    <li className="side-nav-dash__item">
      <a href="#" className="side-nav-dash__link">
        <span>Logout</span>
      </a>
    </li>
  </nav>)
}

export default SideBar