import React, { useEffect, useState } from "react";
import DashboardNavbar from "../../components/Dashboard/HeaderBar";

import { Link, useLocation } from "react-router-dom";

import { useFirestoreConnect, isLoaded } from "react-redux-firebase";
import {
  getMaxAndMinLat,
  getMaxAndMinLong,
  distance,
} from "../../Utils/Distance";
import { useSelector, useDispatch } from "react-redux";
import { getTripByRadius } from "../../redux/actions/tripsActions";
import TripCardSearch from "../../components/Search/TripCardSearch";
import SearchLeft from "./SearchLeft";
import Loading from "../../components/Loading";
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

  var filteredTrips = [];
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
    if (isLoaded(trips) && filteredTrips.length !== 0) {
      console.log(filteredTrips[0]);
      setSelectedTrip(filteredTrips[0]);
    }
  }, [trips, filteredTrips]);
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

        {isLoaded(trips) &&
        filteredTrips.length !== 0 &&
        selectedTrip !== null ? (
          <SearchLeft
            selectedTrip={selectedTrip}
            filteredTrips={filteredTrips}
          />
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};

export default SearchFound;
