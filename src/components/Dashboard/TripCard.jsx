import React from 'react'
import icon from "../../assets/sprite.svg";
import avatar from "../../static/img/avatar.png";
const TripCard = (props) => {

  const convertDate = (date) => {
    const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: '2-digit' }) 
    const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat.formatToParts(date) 

    return `${month} ${day}`
  }

    return (
        <div className="trip-card-dash">
                <div className="trip-card-dash__heading">
                  <img src={avatar} alt="" className="trip-card-dash__image" />
                  <h3 className="trip-card-dash__heading--text">{props.firstName} {props.lastName}</h3>
                </div>
                <div className="trip-card-dash__middle">
                  <span className="trip-card-dash__middle--text">
                    {props.originTitle}
                  </span>
                  <span className="trip-card-dash__middle--text">
                   {props.destTitle}
                  </span>
                </div>
                <div className="trip-card-dash__bottom">
                  <div className="trip-card-dash__bottom--align">
                    <svg className="trip-card-dash__icon">
                      <use xlinkHref={`${icon}#icon-calendar`}></use>
                    </svg>
                      <span className="trip-card-dash__bottom--text">{convertDate(props.departDate)}</span>
                  </div>
                  <div className="trip-card-dash__bottom--align">
                    <svg className="trip-card-dash__icon">
                      <use xlinkHref={`${icon}#icon-clock`}></use>
                    </svg>
                    <span className="trip-card-dash__bottom--text">{props.departTime}</span>
                  </div>
                </div>
                <div className="trip-card-dash__back">
                <svg className="trip-card-dash__back--icon">
                      <use xlinkHref={`${icon}#icon-mail`}></use>
                    </svg>
                    <svg className="trip-card-dash__back--icon">
                      <use xlinkHref={`${icon}#icon-bookmark`}></use>
                    </svg>
                </div>
              </div>
    )

}

export default TripCard;