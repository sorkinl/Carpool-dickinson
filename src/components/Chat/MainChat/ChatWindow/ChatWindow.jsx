import React, { useState } from "react";
import firebase from "../../../../firebase/firebaseConfig";
import { useFirestore } from "react-redux-firebase";
import RequestHandler from "./RequestHandler";
import _ from "lodash";

const ChatWindow = (props) => {
  const [message, setMessage] = useState("");
  const firestore = useFirestore();
  const sendMessage = () => {
    if (props.chat) {
      firestore.update(
        {
          collection: "chatRooms",
          doc: props.chat.id,
        },
        {
          messages: firebase.firestore.FieldValue.arrayUnion({
            createdAt: firebase.firestore.Timestamp.now(),
            uid: firebase.auth().currentUser.uid,
            text: message,
          }),
        }
      );

      setMessage("");
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-window__top">
        {props.chat && (_.isEmpty(props.chat.requests) || props.chat.requests[firebase.auth().currentUser.uid]) ? (
          <>
            {props.chat
              ? props.chat.messages.map((message) =>
                  message.uid === firebase.auth().currentUser.uid ? (
                    <p className="chat-window__message--out">
                      <span className="chat-window__message">
                        {message.text}
                      </span>
                    </p>
                  ) : (
                    <p className="chat-window__message--in">
                      <span className="chat-window__message">
                        {message.text}
                      </span>{" "}
                    </p>
                  )
                )
              : null}
          </>
        ) : (
          <div>
            {props.chat
              ? Object.entries(props.chat.requests).map(([key, value]) => {
                  console.log(key, value);
                  return (
                    <RequestHandler
                      requestId={key}
                      request={value}
                      chat={props.chat}
                    />
                  );
                })
              : null}
          </div>
        )}
      </div>

      <div className="chat-window__bottom">
        <input
          type="text"
          className="chat-window__bottom--input"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button className="chat-window__bottom--button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
