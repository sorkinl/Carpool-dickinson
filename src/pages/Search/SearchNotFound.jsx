import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useFirestoreConnect, isLoaded } from "react-redux-firebase";
import { useSelector } from "react-redux";
import TripCardSearch from "../../components/Search/TripCardSearch";
import Loading from "../../components/Loading";
import SearchLeft from "./SearchLeft";
const SearchNotFound = () => {
  useFirestoreConnect([
    {
      collection: "trips",
      orderBy: ["departDate", "desc"],
      storeAs: "searchedTrips",
    },
  ]);

  const [selectedTrip, setSelectedTrip] = useState(null);

  const trips = useSelector((state) => state.firestore.ordered.searchedTrips);

  useEffect(() => {
    if (isLoaded(trips) && trips.length !== 0) {
      setSelectedTrip(trips[0]);
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
          <h2 className="search-trip-list__heading">Most Recent</h2>
          <h3 className="search-trip-list__sub-heading">On September 8th</h3>
          {trips
            ? trips.map((trip) => (
                <TripCardSearch {...trip} selectTrip={selectTrip} />
              ))
            : null}
        </div>
        {isLoaded(trips) && trips.length !== 0 && selectedTrip !== null ? (
          <SearchLeft selectedTrip={selectedTrip} filteredTrips={trips} />
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};

export default SearchNotFound;
