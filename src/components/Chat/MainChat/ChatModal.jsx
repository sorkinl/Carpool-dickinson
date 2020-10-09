import React, { useState } from "react";
import { useFirestore } from "react-redux-firebase";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import firebase from "../../../firebase/firebaseConfig";
import { useSelector } from "react-redux";
const ChatModal = ({ open, setOpen, tripId, ownerId }) => {
  const [message, setMessage] = useState("");
  const firestore = useFirestore();
  const currentUser = firebase.auth().currentUser;
  const { firstName, lastName } = useSelector(
    (state) => state.firebase.profile
  );
  const sendMessage = () => {
    /* firestore
      .collection("trips")
      .doc(tripId)
      .collection("members")
      .add({
        type: "requested",
        message: [message],
        email: currentUser.email,
        uid: currentUser.uid,
      }); */
    firestore.update(
      {
        collection: "trips",
        doc: tripId,
      },
      {
        requests: firebase.firestore.FieldValue.arrayUnion(currentUser.uid),
      }
    );
    firestore.add(
      {
        collection: "trips",
        doc: tripId,
        subcollections: [
          {
            collection: "members",
          },
        ],
      },
      {
        type: "requested",
        message: [message],
        email: currentUser.email,
        uid: currentUser.uid,
        ownerId: ownerId,
        firstName: firstName,
        lastName: lastName,
      }
    );
    setOpen(false);
  };
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <h1>Request to be part of this trip?</h1>
      <p className="chat-modal__p">
        Once the user has accepted your request you will be able to chat with
        them.
      </p>
      <textarea
        className="chat-modal__textarea"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <div className="chat-modal__btn-group">
        <button className="btn btn--purple" onClick={sendMessage}>
          Send
        </button>
        <button className="btn btn--purple">Cancel</button>
      </div>
    </Modal>
  );
};
export default ChatModal;
