import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faBookmark,
  faCommentAlt,
} from "@fortawesome/free-regular-svg-icons";
import avatar from "../../static/img/avatar.png";
const DashboardCard = (props) => {
  return (
    <div className="main-dash__trip-card m-4">
      <div className="main-dash__trip-card--left">
        <img src={avatar} alt="" className="main-dash__trip-card--left-image" />

        <span className="main-dash__trip-card--left-text">Katie</span>
        {/* <div className="">
        <svg className="main-dash__star-icon">
          <use xlinkHref={`${icon}#icon-star`}></use>
        </svg>
      </div> */}
        {/* <span>3.6</span> */}
      </div>
      <div className="main-dash__trip-card--middle">
        <div className="main-dash__trip-card--middle-top">
          <p>
            <span className="main-dash__trip-card--middle-faded">From</span>{" "}
            <span className="main-dash__trip-card--middle-trip">
              Dickinson College
            </span>
          </p>
          <p>
            <span className="main-dash__trip-card--middle-faded">To</span>{" "}
            <span className="main-dash__trip-card--middle-trip">
              Harrisburg Airport
            </span>
          </p>
          <div>
            <FontAwesomeIcon size="lg" icon={faClock} />
            <span className="main-dash__trip-card--middle-date">
              wednesday shit
            </span>
          </div>
        </div>
        <div className="main-dash__trip-card--middle-bot">
          <span className="main-dash__trip-card--middle-price">$44</span>
          <span className="main-dash__trip-card--middle-seats">1 seat</span>
        </div>
      </div>
      <div className="main-dash__trip-card--right">
        <FontAwesomeIcon icon={faBookmark} size="2x" />
        <FontAwesomeIcon icon={faCommentAlt} size="2x" />
      </div>
    </div>
  );
};

export default DashboardCard;
