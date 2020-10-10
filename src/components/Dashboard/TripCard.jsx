import React, { useState } from "react";
import icon from "../../assets/sprite.svg";
import avatar from "../../static/img/avatar.png";
import { useFirestore, isLoaded } from "react-redux-firebase";
import { useSelector } from "react-redux";
import firebase from "../../firebase/firebaseConfig";
import { Link } from "react-router-dom";
import ChatModal from "../Chat/MainChat/ChatModal";

const TripCard = (props) => {
  const [chatModal, setChatModal] = useState(false);
  const firestore = useFirestore();
  const currentUser = useSelector((state) => state.firebase.profile);
  const currentUserId = useSelector((state) => state.firebase.auth.uid);
  const bookmarkedTrips = useSelector(
    (state) => state.firestore.ordered.bookmarkedTrips
  );
  //Converts date into string of understandable characters
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
  //Toggle bookmarks
  const editBookmarks = () => {
    if (bookmarkedTrips.every((trip) => trip.id !== props.tripId)) {
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
  //Adds user to chatRoom's requests array or creates a new chatRoom via cloud function
  const requestTrip = async () => {
    setChatModal(true);
    /* var docRef = await firebase
      .firestore()
      .collection("chatRooms")
      .doc(props.tripId)
      .get();
    console.log(docRef);
    if (docRef.exists) {
      firestore.update(
        {
          collection: "chatRooms",
          doc: docRef.id,
        },
        {
          requests: {
            [firebase.auth().currentUser.uid] : {
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                photoUrl: currentUser.photoUrl,
            }
          },
          memberIds: firebase.firestore.FieldValue.arrayUnion(
            firebase.auth().currentUser.uid
          ),
        }
      ); */
    /*  } else {
      console.log(props);
      await fetch(
        "https://us-central1-carpool-d.cloudfunctions.net/createChatRoom",
        {
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          method: "POST",
          body: JSON.stringify({
            tripId: props.tripId,
            uid: firebase.auth().currentUser.uid,
          }),
        }
      );
    } */
  };
  console.log(props.photoUrl);
  return (
    <div className="trip-card-dash">
      <div className="trip-card-dash__heading">
        <Link to={`users/${props.uid}`}>
          {/* {props.firstName} {props.lastName} */}
          <img src={props.photoUrl} alt="" className="trip-card-dash__image" />
        </Link>
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
            <span className="trip-card-dash__bottom--text">
              {convertDate(props.departDate)}
            </span>
          </div>
          <div className="trip-card-dash__bottom--align">
            <svg className="trip-card-dash__icon">
              <use xlinkHref={`${icon}#icon-clock`}></use>
            </svg>
            <span className="trip-card-dash__bottom--text">
              {props.departTime.toString()}
            </span>
          </div>
        </div>
        <div className="trip-card-dash__back">
          {props.uid !== firebase.auth().currentUser.uid ? (
            <>
              {!props.members || !props.members.includes(currentUserId) ? (
                <svg
                  className="trip-card-dash__back--icon"
                  onClick={requestTrip}
                >
                  <use xlinkHref={`${icon}#icon-mail`}></use>
                </svg> /* {" "} */
              ) : null}

              <svg
                className={`trip-card-dash__back--icon${
                  isLoaded(bookmarkedTrips) &&
                  bookmarkedTrips.some((trip) => trip.id === props.tripId)
                    ? "-active"
                    : ""
                }`}
                onClick={editBookmarks}
              >
                <use xlinkHref={`${icon}#icon-bookmark`}></use>
              </svg>
            </>
          ) : (
            <p>This is your trip</p>
          )}
        </div>
      </div>
      <ChatModal
        open={chatModal}
        setOpen={setChatModal}
        tripId={props.tripId}
      />
    </div>
  );
};

export default TripCard;
