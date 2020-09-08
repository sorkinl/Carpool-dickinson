import React from 'react';
import icon from "../../assets/sprite.svg";
import avatar from "../../static/img/avatar.png"
const TripCardSearch = (props) => {
    const convertDate = (date) => {
        const dateTimeFormat = new Intl.DateTimeFormat("en", {
          year: "numeric",
          month: "long",
          day: "2-digit",
        });
        const [
          { value: month },
          ,
          { value: day },
          ,
          { value: year },
        ] = dateTimeFormat.formatToParts(date);
    
        return `${month} ${day}`;
      };
    console.log(props);
    return (<div className="search-trip-list__card">
    <div className="search-trip-list__card--left">
      <img src={avatar} alt="" className="search-trip-list__card--avatar" />
      <p>{props.firstName} '22</p>
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
              <li>From: {props.originTitle}</li>
              <li>To: {props.destTitle}</li>
              <li>Date: {convertDate(props.departDate)}</li>
          </ul>
      </div>
      <div className="search-trip-list__card--middle--bottom">
          <span>Time: {props.departTime}</span>
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
  </div>)
}

export default TripCardSearch;

