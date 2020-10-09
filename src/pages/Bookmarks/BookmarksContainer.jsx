import React from "react";
import { useSelector } from "react-redux";
import { isLoaded, useFirestoreConnect } from "react-redux-firebase";
import { HereMap } from "../../components/HereMap/HereMap";
import TripCardSearch from "../../components/Search/TripCardSearch";
import firebase from "../../firebase/firebaseConfig";
const BookmarksContainer = (props) => {
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

  return (
    <div className="bookmarks-container">
      <div className="bookmarks-container__list">
        {isLoaded(bookmarks) &&
          bookmarks.map((trip) => <TripCardSearch {...trip} />)}
      </div>
      <HereMap />
      <div className="bookmarks-container__selected"></div>
    </div>
  );
};

export default BookmarksContainer;
