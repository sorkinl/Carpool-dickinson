import React from "react";
import HeaderBar from "../../components/Dashboard/HeaderBar";
import { HereMap } from "../../components/HereMap/HereMap";
import { Link } from "react-router-dom";
import icon from "../../assets/sprite.svg";
import avatar from "../../static/img/avatar.png"
const SearchPage = (props) => {
  return (
    <>
      {/* <HeaderBar /> */}
      <div className="search-container">
        <div className="search-trip-list">
          <Link to="/dashboard" className="search-trip-list__back">
            Back to dashboard
          </Link>
          <h2 className="search-trip-list__heading">
            Rides from Harrisburg, PA to 28 N College St, Carlisle, PA
          </h2>
          <h3 className="search-trip-list__sub-heading">On September 8th</h3>
          <div className="search-trip-list__card">
            <div className="search-trip-list__card--left">
              <img src={avatar} alt="" className="search-trip-list__card--avatar" />
              <p>Leonid '22</p>
              <p>Computer Science</p>
              <div className="search-trip-list__card--left--bottom">
              <svg className="search-trip-list__card--star">
                <use xlinkHref={`${icon}#icon-star`}></use>
              </svg>
              <span>2.55</span>
              </div>
            </div>
            <div className="search-trip-list__card--middle">
              <div className="search-trip-list__card--middle--top">
                  <ul className="list-none">
                      <li>From: Harrisburg, PA</li>
                      <li>To: 28 N College St, Carlisle, PA</li>
                      <li>Date: 28th of August</li>
                  </ul>
              </div>
              <div className="search-trip-list__card--middle--bottom">
                  <span>Time: Anytime</span>
                  <span>Price: Free</span>
              </div>
            </div>
            <div className="search-trip-list__card--right">
            <svg className="search-trip-list__card--icon">
                <use xlinkHref={`${icon}#icon-mail`}></use>
              </svg>
              <svg className="search-trip-list__card--icon">
                <use xlinkHref={`${icon}#icon-bookmark`}></use>
              </svg>
            </div>
          </div>
          <div className="search-trip-list__card">
            <div className="search-trip-list__card--left">
              <img src={avatar} alt="" className="search-trip-list__card--avatar" />
              <p>Leonid '22</p>
              <p>Computer Science</p>
              <div className="search-trip-list__card--left--bottom">
              <svg className="search-trip-list__card--star">
                <use xlinkHref={`${icon}#icon-star`}></use>
              </svg>
              <span>2.55</span>
              </div>
            </div>
            <div className="search-trip-list__card--middle">
              <div className="search-trip-list__card--middle--top">
                  <ul className="list-none">
                      <li>From: Harrisburg, PA</li>
                      <li>To: 28 N College St, Carlisle, PA</li>
                      <li>Date: 28th of August</li>
                  </ul>
              </div>
              <div className="search-trip-list__card--middle--bottom">
                  <span>Time: Anytime</span>
                  <span>Price: Free</span>
              </div>
            </div>
            <div className="search-trip-list__card--right">
            <svg className="search-trip-list__card--icon">
                <use xlinkHref={`${icon}#icon-mail`}></use>
              </svg>
              <svg className="search-trip-list__card--icon">
                <use xlinkHref={`${icon}#icon-bookmark`}></use>
              </svg>
            </div>
          </div>
          <div className="search-trip-list__card">
            <div className="search-trip-list__card--left">
              <img src={avatar} alt="" className="search-trip-list__card--avatar" />
              <p>Leonid '22</p>
              <p>Computer Science</p>
              <div className="search-trip-list__card--left--bottom">
              <svg className="search-trip-list__card--star">
                <use xlinkHref={`${icon}#icon-star`}></use>
              </svg>
              <span>2.55</span>
              </div>
            </div>
            <div className="search-trip-list__card--middle">
              <div className="search-trip-list__card--middle--top">
                  <ul className="list-none">
                      <li>From: Harrisburg, PA</li>
                      <li>To: 28 N College St, Carlisle, PA</li>
                      <li>Date: 28th of August</li>
                  </ul>
              </div>
              <div className="search-trip-list__card--middle--bottom">
                  <span>Time: Anytime</span>
                  <span>Price: Free</span>
              </div>
            </div>
            <div className="search-trip-list__card--right">
            <svg className="search-trip-list__card--icon">
                <use xlinkHref={`${icon}#icon-mail`}></use>
              </svg>
              <svg className="search-trip-list__card--icon">
                <use xlinkHref={`${icon}#icon-bookmark`}></use>
              </svg>
            </div>
          </div>
          <div className="search-trip-list__card">
            <div className="search-trip-list__card--left">
              <img src={avatar} alt="" className="search-trip-list__card--avatar" />
              <p>Leonid '22</p>
              <p>Computer Science</p>
              <div className="search-trip-list__card--left--bottom">
              <svg className="search-trip-list__card--star">
                <use xlinkHref={`${icon}#icon-star`}></use>
              </svg>
              <span>2.55</span>
              </div>
            </div>
            <div className="search-trip-list__card--middle">
              <div className="search-trip-list__card--middle--top">
                  <ul className="list-none">
                      <li>From: Harrisburg, PA</li>
                      <li>To: 28 N College St, Carlisle, PA</li>
                      <li>Date: 28th of August</li>
                  </ul>
              </div>
              <div className="search-trip-list__card--middle--bottom">
                  <span>Time: Anytime</span>
                  <span>Price: Free</span>
              </div>
            </div>
            <div className="search-trip-list__card--right">
            <svg className="search-trip-list__card--icon">
                <use xlinkHref={`${icon}#icon-mail`}></use>
              </svg>
              <svg className="search-trip-list__card--icon">
                <use xlinkHref={`${icon}#icon-bookmark`}></use>
              </svg>
            </div>
          </div>
          
        </div>
        <div className="search-map">
          <HereMap />
        </div>
      </div>
    </>
  );
};

export default SearchPage;
