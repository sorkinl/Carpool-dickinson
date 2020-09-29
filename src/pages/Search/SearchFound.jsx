import React from "react";
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
            ? filteredTrips.map((trip) => <TripCardSearch {...trip} />)
            : null}
        </div>
        <div className="search-map">
          <HereMap trips={filteredTrips} />
        </div>
      </div>
    </>
  );
};

export default SearchFound;
