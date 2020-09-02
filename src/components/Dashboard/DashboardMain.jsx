import React, {useState, useEffect} from 'react'
import icon from "../../assets/sprite.svg";
import avatar from "../../static/img/avatar.png";
import TripCard from './TripCard';
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import firebase from '../../firebase/firebaseConfig';
import { useSelector } from 'react-redux';
import Loading from '../Loading';
import ChatModal, {openModal} from  '../Chat/MainChat/ChatModal';
const DashboardMain = () => {
  
  useFirestoreConnect([{
    collection: 'trips',
    storeAs: 'recentTrips'
  }])

  useFirestoreConnect([{
    collection: 'users',
    doc: firebase.auth().currentUser.uid,
    subcollections: [
      {
        collection: 'bookmarks',
      }
    ],
    storeAs: 'bookmarkedTrips'
  }])

  const handleClick = (e)=>{
    setChatModal(e)
    setChatModalOn(true)
    console.log(chatModalOn)
  }
  const setChatModalOff = (e)=>{
    setChatModalOn(false)
  }



  const recentTrips = useSelector(state => state.firestore.ordered.recentTrips)
  const bookmarkedTrips = useSelector(state => state.firestore.ordered.bookmarkedTrips)
  
  const [chatModal, setChatModal] = useState("");
  const [chatModalOn, setChatModalOn] = useState(false);
    
    return(
        <main className="main-dash">
            <div className="main-dash__trip-header">
              <h1 className="main-dash__trip-heading">Most recent trips</h1>
              <div className="main-dash__arrows">
                <svg className="main-dash__arrow-icon">
                  <use xlinkHref={`${icon}#icon-chevron-thin-left`}></use>
                </svg>
                <svg className="main-dash__arrow-icon">
                  <use xlinkHref={`${icon}#icon-chevron-thin-right`}></use>
                </svg>
              </div>
            </div>
            <div style={{display: "flex"}}>
              Bookmarked
              {isLoaded(bookmarkedTrips) ? bookmarkedTrips.map(trip => (
                <TripCard
                key={trip.id}
                tripId={trip.id}
                firstName={trip.firstName}
                lastName={trip.lastName}
                destTitle={trip.destTitle}
                originTitle={trip.originTitle}
                departDate={trip.departDate}
                departTime={trip.departTime}
                uid={trip.uid}

                chatModal = {chatModal}
                onClick= {handleClick}
                />
              )): <Loading/>}
              
            </div>
            <div className="main-dash__trip-section">
              {isLoaded(recentTrips) ? recentTrips.map((trip) => 
                <TripCard
                key={trip.id}
                tripId={trip.id}
                firstName={trip.firstName}
                lastName={trip.lastName}
                destTitle={trip.destTitle}
                originTitle={trip.originTitle}
                departDate={trip.departDate}
                departTime={trip.departTime}
                uid={trip.uid}
            
                chatModal = {chatModal}
                onClick= {handleClick}
                />
              ): <Loading/>}
              
              
            </div>
            <div className="main-dash__chat-section">
                {console.log(chatModalOn)}

                {chatModalOn && <ChatModal messages = {chatModal} setChatModalOn = {setChatModalOff} />}
              </div>

            
          </main>
    )
}


export default DashboardMain;