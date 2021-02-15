import React, { useState } from "react";
import icon from "../../assets/sprite.svg";
import avatar from "../../static/img/avatar.png";
import TripCard from "./TripCard";
import { useFirestoreConnect, isLoaded } from "react-redux-firebase";
import firebase from "../../firebase/firebaseConfig";
import { useSelector } from "react-redux";
import Loading from "../Loading";
import AutoInput from "../HOC/AutoSuggest";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faBookmark,
  faCommentAlt,
} from "@fortawesome/free-regular-svg-icons";
const DashboardMain = (props) => {
  useFirestoreConnect([
    {
      collection: "trips",
      storeAs: "recentTrips",
    },
  ]);

  useFirestoreConnect([
    {
      collection: "users",
      doc: firebase.auth().currentUser.uid,
      subcollections: [
        {
          collection: "bookmarks",
        },
      ],
      storeAs: "bookmarkedTrips",
    },
  ]);

  const recentTrips = useSelector(
    (state) => state.firestore.ordered.recentTrips
  );
  const bookmarkedTrips = useSelector(
    (state) => state.firestore.ordered.bookmarkedTrips
  );

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
  };

  return (
    <main className="main-dash">
      <div className="main-dash__trip-header">
        <div className="main-dash__trip-header--container">
          <div className="main-dash__trip-header--subcontainer">
            <div>
              <h1 className="main-dash__trip-heading">Good morning, Katie</h1>
              <h2 className="main-dash__trip-subheading">
                Let's find a great deal for your trip...
              </h2>
            </div>
            <form className="search-dashboard">
              <AutoInput
                onSuggestionSelected={onOriginSuggestionSelected}
                placeholder={"Origin..."}
              />
              <div className="verticalLine"></div>
              <AutoInput
                onSuggestionSelected={onDestinationSuggestionSelected}
                placeholder={"Destination..."}
              />
              <button onClick={handleFind} className="search-dashboard__button">
                Find
              </button>
            </form>
            {/* <div className="main-dash__arrows">
          <svg className="main-dash__arrow-icon">
            <use xlinkHref={`${icon}#icon-chevron-thin-left`}></use>
          </svg>
          <svg className="main-dash__arrow-icon">
            <use xlinkHref={`${icon}#icon-chevron-thin-right`}></use>
          </svg>
        </div> */}
          </div>
        </div>
      </div>
      {/* <div style={{ display: "flex" }}>
        Bookmarked
        {isLoaded(bookmarkedTrips) ? (
          bookmarkedTrips.map((trip) => (
            <TripCard
              key={trip.id}
              tripId={trip.id}
              firstName={trip.firstName}
              lastName={trip.lastName}
              destTitle={trip.destTitle}
              originTitle={trip.originTitle}
              departDate={trip.departDate}
              departTime={trip.departTime}
              uid={trip.uid}
            />
          ))
        ) : (
          <Loading />
        )}
      </div> */}
      <div className="main-dash__trip-section">
        <h1>Most recent trips</h1>
        <div className="main-dash__trip-section--container">
          <div className="main-dash__trip-card">
            <div className="main-dash__trip-card--left">
              <img
                src={avatar}
                alt=""
                className="main-dash__trip-card--left-image"
              />

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
                  <span className="main-dash__trip-card--middle-faded">
                    From
                  </span>{" "}
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
                <span className="main-dash__trip-card--middle-seats">
                  1 seat
                </span>
              </div>
            </div>
            <div className="main-dash__trip-card--right">
              <FontAwesomeIcon icon={faBookmark} size="2x" />
              <FontAwesomeIcon icon={faCommentAlt} size="2x" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardMain;
