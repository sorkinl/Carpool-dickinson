import React, { useState } from "react";
import ChatModal from "../../components/Chat/MainChat/ChatModal";
import icon from "../../assets/sprite.svg";
import avatar from "../../static/img/avatar.png";
import { HereMap } from "../../components/HereMap/HereMap";
import { auth } from "firebase";
const SearchLeft = ({ selectedTrip, filteredTrips }) => {
  const [chatModal, setChatModal] = useState(false);
  return (
    <div className="search-map">
      <HereMap
        trips={filteredTrips}
        originLat={selectedTrip.origin.latitude}
        originLong={selectedTrip.origin.longitude}
        destinationLat={selectedTrip.destination.latitude}
        destinationLong={selectedTrip.destination.longitude}
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
              {!selectedTrip.members.includes(auth().currentUser.uid) &&
                !selectedTrip.requests.includes(auth().currentUser.uid) && (
                  <button
                    className="btn-tertiary"
                    onClick={() => setChatModal(true)}
                  >
                    Send trip request
                  </button>
                )}
              <button className="btn-tertiary">Bookmark</button>
            </div>
          </>
        ) : (
          <div>No trip</div>
        )}
      </div>
      <ChatModal
        open={chatModal}
        setOpen={setChatModal}
        tripId={selectedTrip.id}
        ownerId={selectedTrip.uid}
      />
    </div>
  );
};

export default SearchLeft;
