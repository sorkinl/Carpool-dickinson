import React from 'react'
import logo from "../../assets/images/logo.png";
import icon from "../../assets/sprite.svg";
import avatar from "../../static/img/avatar.png";

const DashboardNavbar = () => {
    return (
        <header className="header-dashboard">
          <img src={logo} alt="logo" className="logo-dashboard" />

          <form action="#" className="search-dashboard">
            <input
              type="text"
              className="search-dashboard__input"
              placeholder="Search by destination"
            />
            <button className="search-dashboard__button">
              <svg className="search-dashboard__icon">
                <use xlinkHref={`${icon}#icon-magnifying-glass`}></use>
              </svg>
            </button>
          </form>

          <nav className="user-nav">
            <div className="user-nav__icon-box">
              <svg className="user-nav__icon">
                <use xlinkHref={`${icon}#icon-bookmark`}></use>
              </svg>
              <span className="user-nav__notification">7</span>
            </div>
            <div className="user-nav__icon-box">
              <svg className="user-nav__icon">
                <use xlinkHref={`${icon}#icon-chat`}></use>
              </svg>
              <span className="user-nav__notification">7</span>
            </div>
            <div className="user-nav__user">
              <img src={avatar} alt="" className="user-nav__user-photo" />
              <span className="user-nav__user-name">Leonid</span>
            </div>
          </nav>
        </header>
    )
}

export default DashboardNavbar