import React, {useEffect} from 'react';
import HeaderBar from '../../Dashboard/HeaderBar';
import {Link, useParams, useHistory} from 'react-router-dom';
import avatar from "../../../static/img/avatar.png"
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import firebase from '../../../firebase/firebaseConfig';
import { useSelector } from 'react-redux';
import ChatWindow from './ChatWindow/ChatWindow';
import { useState } from 'react';
import Loading from '../../Loading';


const MainChat = (props) => {
  // History object for handling url
  const history = useHistory();
  // Condition for redirecting to first chat on load
  const [firstChat, setFirstChat] = useState(false);
  useFirestoreConnect([{
    collection: 'chatRooms',
    where: [
      ["memberIds", "array-contains", firebase.auth().currentUser.uid]
  ],
  }]);
  // params are url parameters
  const params = useParams();
  const chatRooms = useSelector(state => state.firestore.ordered.chatRooms);
  //Check if chatRooms are loaded
  if(isLoaded(chatRooms)){
    if(!firstChat){
    history.push("/chat/"+ chatRooms[0].id)
    setFirstChat(true)
    }
    return (
      <div className="container-dashboard">
        {/* <HeaderBar/> */}
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
      </div>)
  } else {
    return (<Loading/>)
  }
  
 
}

export default MainChat;

