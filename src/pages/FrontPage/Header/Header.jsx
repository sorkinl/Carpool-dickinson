import React from "react";
import "./Header.scss";
import logo from "../../../assets/images/logo.png";
import svg from "../../../assets/images/blue_off_road.svg";
import DoubleArrow from "@material-ui/icons/DoubleArrow";
const Header = () => {
  return (
    <header className="header">
      <div>
        <div className="header__logo-box">
          <img src={logo} alt="Logo" className="header__logo" />
        </div>
        <div className="header__text-box">
          <h1 className="heading-primary">
            <span className="heading-primary--main">Get around easier</span>
            {/*  <span class="heading-primary--sub">is where life happens</span> */}
          </h1>
          <a href="#" className="btn btn--yellow btn--animated">
            Discover our tours
          </a>
        </div>
        <div className="illustration">
          <img src={svg} alt="" className="illustration__image" />
        </div>
      </div>
      <div className="arrow">
        <i class="arrow__icon icon-arrows-down-double"></i>
      </div>
    </header>
  );
};

export default Header;
