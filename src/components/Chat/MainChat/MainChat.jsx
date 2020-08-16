import React, {useEffect} from 'react';
import DashboardNavbar from '../../Dashboard/DashboardNavbar';
import {Link, useParams} from 'react-router-dom';
import avatar from "../../../static/img/avatar.png"
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import firebase from '../../../firebase/firebaseConfig';
import { useSelector } from 'react-redux';
import ChatWindow from './ChatWindow/ChatWindow';


const MainChat = (props) => {
  //exporting styles from outside file
  
  useFirestoreConnect([{
    collection: 'chatRooms',
    where: [
      ["memberIds", "array-contains", firebase.auth().currentUser.uid]
  ],
  }]);


  console.log(firebase.auth().currentUser.uid)
  const params = useParams();
  
  const chatRooms = useSelector(state => state.firestore.ordered.chatRooms);
    return (
      <div className="container-dashboard">
      <DashboardNavbar/>
        <div className="chat-container">
          <div className="chat-sidebar">
            
            <Link to="/dashboard">
              <button className="chat-sidebar__link">
              Return to Dashboard
              </button>
            </Link>
            
            <ul className="chat-sidebar__list">
              {isLoaded(chatRooms) ? chatRooms.map((room) => (
                <Link to={`/chat/${room.id}`} key={room.id}>
                <li className="chat-sidebar__list-element">{room.trip.destTitle} Driver: {room.trip.uid === firebase.auth().currentUser.uid?"you":room.trip.firstName}</li>
                </Link>
              )):"null"}
            </ul>
          </div>
          <ChatWindow chat={isLoaded(chatRooms)?chatRooms.find((room) => room.id === params.chatId):null}/>

        
        <div className="chat-rightbar">
          <img src={avatar} className="chat-rightbar__image">
          </img>
          <div className="chat-rightbar__name">Leo Sorkin</div>
          <div className="chat-rightbar__major">Computer Science  &middot; Class 2022</div>
        </div>
        </div>
        </div>
        )
}

export default MainChat;

