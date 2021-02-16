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
import DashboardCard from "./DashboardCard";
import { Col, Container, Row } from "react-bootstrap";
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
        <Container className="main-dash__trip-section--container">
          <Row>
            <Col>
              <DashboardCard />
            </Col>
            <Col>
              <DashboardCard />
            </Col>
          </Row>
          <Row>
            <Col>
              <DashboardCard />
            </Col>
            <Col>
              <DashboardCard />
            </Col>
          </Row>
          <Row>
            <Col>
              <DashboardCard />
            </Col>
            <Col>
              <DashboardCard />
            </Col>
          </Row>
        </Container>
      </div>
    </main>
  );
};

export default DashboardMain;
