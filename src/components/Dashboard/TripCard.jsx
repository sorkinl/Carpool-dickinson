import React from "react";
import icon from "../../assets/sprite.svg";
import avatar from "../../static/img/avatar.png";
import { useFirestore, isLoaded } from "react-redux-firebase";
import { useSelector } from "react-redux";
import firebase from "../../firebase/firebaseConfig";
const TripCard = (props) => {
  const firestore = useFirestore();
  const currentUser = useSelector((state) => state.firebase.profile);
  const bookmarkedTrips = useSelector(state => state.firestore.ordered.bookmarkedTrips)
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

  const editBookmarks = () => {
    if (bookmarkedTrips.every(trip => trip.id !== props.tripId)) {
      firestore.set(
        {
          collection: "users",
          doc: firebase.auth().currentUser.uid,
          subcollections: [
            {
              collection: "bookmarks",
              doc: props.tripId,
            },
          ],
        },
        {
          firstName: props.firstName,
          lastName: props.lastName,
          destTitle: props.destTitle,
          originTitle: props.originTitle,
          departDate: props.departDate,
          departTime: props.departTime,
        }
      );
    } else {
      firestore.delete({
        collection: "users",
        doc: firebase.auth().currentUser.uid,
        subcollections: [
          {
            collection: "bookmarks",
            doc: props.tripId,
          },
        ],
      });
    }
  };

  return (
    <div className="trip-card-dash">
      <div className="trip-card-dash__heading">
        <img src={avatar} alt="" className="trip-card-dash__image" />
        <h3 className="trip-card-dash__heading--text">
          {props.firstName} {props.lastName}
        </h3>
      </div>
      <div className="trip-card-dash__middle">
        <span className="trip-card-dash__middle--text">
          {props.originTitle}
        </span>
        <span className="trip-card-dash__middle--text">{props.destTitle}</span>
      </div>
      <div className="trip-card-dash__bottom">
        <div className="trip-card-dash__bottom--align">
          <svg className="trip-card-dash__icon">
            <use xlinkHref={`${icon}#icon-calendar`}></use>
          </svg>
          <span className="trip-card-dash__bottom--text">
            {convertDate(props.departDate)}
          </span>
        </div>
        <div className="trip-card-dash__bottom--align">
          <svg className="trip-card-dash__icon">
            <use xlinkHref={`${icon}#icon-clock`}></use>
          </svg>
          <span className="trip-card-dash__bottom--text">
            {props.departTime}
          </span>
        </div>
      </div>
      <div className="trip-card-dash__back">
        <svg className="trip-card-dash__back--icon">
          <use xlinkHref={`${icon}#icon-mail`}></use>
        </svg>
        <svg
          className={`trip-card-dash__back--icon${
            isLoaded(bookmarkedTrips) && bookmarkedTrips.some(trip => trip.id === props.tripId) ? "-active" : ""
          }`}
          onClick={editBookmarks}
        >
          <use xlinkHref={`${icon}#icon-bookmark`}></use>
        </svg>
      </div>
    </div>
  );
};

export default TripCard;
