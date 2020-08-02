import React from 'react'
import icon from "../../assets/sprite.svg";
import { Link } from 'react-router-dom';
const DashboardSideBar = () => {
    return (<nav className="sidebar-dashboard">
    <ul className="side-nav-dash">
      <li className="side-nav-dash__item side-nav-dash__item--active">
        <a href="#" className="side-nav-dash__link--active">
          <svg className="side-nav-dash__icon">
            <use xlinkHref={`${icon}#icon-home`}></use>
          </svg>
          <span>Overview</span>
        </a>
      </li>
      <li className="side-nav-dash__item">
        <a href="#" className="side-nav-dash__link">
          <svg className="side-nav-dash__icon">
            <use xlinkHref={`${icon}#icon-location`}></use>
          </svg>
          <span>My trips</span>
        </a>
      </li>
      <li className="side-nav-dash__item">
        <a href="#" className="side-nav-dash__link">
          <svg className="side-nav-dash__icon">
            <use xlinkHref={`${icon}#icon-message`}></use>
          </svg>
          <span>Messages</span>
        </a>
      </li>
      <li className="side-nav-dash__item">
        <Link to="/account" className="side-nav-dash__link">
          <svg className="side-nav-dash__icon">
            <use xlinkHref={`${icon}#icon-user`}></use>
          </svg>
          <span>Profile</span>
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

export default DashboardSideBar