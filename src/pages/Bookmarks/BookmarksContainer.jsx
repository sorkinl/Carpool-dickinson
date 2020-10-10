import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { isLoaded, useFirestoreConnect } from "react-redux-firebase";
import TripCardSearch from "../../components/Search/TripCardSearch";
import firebase from "../../firebase/firebaseConfig";
import { Link } from "react-router-dom";
import SearchLeft from "../Search/SearchLeft";
import Loading from "../../components/Loading";
const BookmarksContainer = (props) => {
  const [selectedTrip, setSelectedTrip] = useState(null);
  useFirestoreConnect([
    {
      collection: "users",
      doc: firebase.auth().currentUser.uid,
      subcollections: [
        {
          collection: "bookmarks",
        },
      ],
      storeAs: "bookmarks",
    },
  ]);

  const bookmarks = useSelector((state) => state.firestore.ordered.bookmarks);

  useEffect(() => {
    if (isLoaded(bookmarks) && bookmarks.length !== 0) {
      setSelectedTrip(bookmarks[0]);
    }
  }, [bookmarks]);
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
          <h2 className="search-trip-list__heading">Bookmarks</h2>
          {bookmarks
            ? bookmarks.map((trip) => (
                <TripCardSearch {...trip} selectTrip={selectTrip} />
              ))
            : null}
        </div>

        {isLoaded(bookmarks) && bookmarks.length !== 0 && selectedTrip && (
          <SearchLeft selectedTrip={selectedTrip} filteredTrips={bookmarks} />
        )}
      </div>
    </>
  );
};

export default BookmarksContainer;
