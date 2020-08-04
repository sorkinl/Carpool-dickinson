import React from 'react';
import Drawer from '@material-ui/core/Drawer'
import ChatWindow from '../ChatWindow/ChatWindow';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonInChat from '../PersonInChat/PersonInChat';
import {useStyles} from './mainChatStyles';
import DashboardNavbar from '../../Dashboard/DashboardNavbar';
import {Link} from 'react-router-dom';
import avatar from "../../../static/img/avatar.png"



const MainChat = () => {
  //exporting styles from outside file
  const classes = useStyles();
  
    return (
      <div className="container-dashboard">
      <DashboardNavbar/>
        <div className="chat-container">
          <div className="chat-sidebar">
            
            <Link >
              <button className="chat-sidebar__link">
              Return to Dashboard
              </button>
            </Link>
            <ul className="chat-sidebar__list">
                <Link>
                <li className="chat-sidebar__list-element">Dixie Normus</li>
                </Link>
                <Link>
                <li className="chat-sidebar__list-element">Jenny Talia</li>
                </Link>
                <Link>
                <li className="chat-sidebar__list-element">Leo</li>
                </Link>
                <Link>
                <li className="chat-sidebar__list-element">Yuri Tarted</li>
                </Link>
            </ul>
          </div>
          <div className="chat-window">
            <div className="chat-window__top">

              <p className="chat-window__message--out"><span className="chat-window__message">Hi</span></p>
              <p className="chat-window__message--in"><span className="chat-window__message">How are you?</span> </p>
              
            </div>
            <div className="chat-window__bottom">
                <input type="text" className="chat-window__bottom--input"/>
                <button className="chat-window__bottom--button">Send</button>
            </div>
          </div>

        
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

