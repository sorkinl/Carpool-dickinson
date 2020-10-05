import React, { useEffect, useState } from "react";
import DashboardNavbar from "../../components/Dashboard/DashboardNavbar";
import { HereMap } from "../../components/HereMap/HereMap";
import { Link, useLocation } from "react-router-dom";
import icon from "../../assets/sprite.svg";
import avatar from "../../static/img/avatar.png";
import { useFirestoreConnect, isLoaded } from "react-redux-firebase";
import {
  getMaxAndMinLat,
  getMaxAndMinLong,
  distance,
} from "../../Utils/Distance";
import { useSelector, useDispatch } from "react-redux";
import { getTripByRadius } from "../../redux/actions/tripsActions";
import TripCardSearch from "../../components/Search/TripCardSearch";
const SearchFound = ({
  lat,
  long,
  destinationLat,
  destinationLong,
  originLat,
  originLong,
  originTitle,
  destinationTitle,
}) => {
  useFirestoreConnect([
    {
      collection: "trips",
      where: [
        ["destination.latitude", ">=", lat.minLat],
        ["destination.latitude", "<=", lat.maxLat],
      ],
      storeAs: "searchedTrips",
    },
  ]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const trips = useSelector((state) => state.firestore.ordered.searchedTrips);

  var filteredTrips;
  if (isLoaded(trips)) {
    console.log(long.maxLong, long.minLong);
    filteredTrips = trips.filter((trip) => {
      return (
        distance(
          parseFloat(destinationLat),
          parseFloat(destinationLong),
          trip.destination.latitude,
          trip.destination.longitude
        ) <= 50
      ); /* trip.destination.longitude >= long.minLong && trip.destination.longitude <= long.maxLong; */
    });
  }
  useEffect(() => {
    if (isLoaded(trips)) {
      setSelectedTrip(filteredTrips[0]);
    }
  }, [trips]);
  const selectTrip = (e, trip) => {
    e.preventDefault();
    setSelectedTrip(trip);
  };
  return (
    <>
      <div className="search-container">
        <div className="search-trip-list">
          <Link to="/dashboard" className="search-trip-list__back">
            Back to dashboard
          </Link>
          <h2 className="search-trip-list__heading">
            Rides from {originTitle} to {destinationTitle}
          </h2>
          <h3 className="search-trip-list__sub-heading">On September 8th</h3>
          {filteredTrips
            ? filteredTrips.map((trip) => (
                <TripCardSearch {...trip} selectTrip={selectTrip} />
              ))
            : null}
        </div>
        <div className="search-map">
          <HereMap
            trips={filteredTrips}
            originLat={originLat}
            originLong={originLong}
            destinationLat={destinationLat}
            destinationLong={destinationLong}
          />
          <div className="selected-trip">
            {selectedTrip ? (
              <>
                <div className="selected-trip__left">
                  <img src={avatar} alt="" className="selected-trip__avatar" />
                  <p>{selectedTrip.firstName} '22</p>
                  <p>Computer Science</p>
                  <div className="selected-trip__review">
                    <svg className="selected-trip__review--icon">
                      <use xlinkHref={`${icon}#icon-star`}></use>
                    </svg>
                    <span>2.55</span>
                  </div>
                </div>
                <div className="selected-trip__right">
                  <button className="btn-tertiary">Send trip request</button>
                  <button className="btn-tertiary">Bookmark</button>
                </div>
              </>
            ) : (
              <div>No trip</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchFound;
