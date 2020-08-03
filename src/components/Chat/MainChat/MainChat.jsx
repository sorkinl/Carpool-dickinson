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



const MainChat = () => {
  //exporting styles from outside file
  const classes = useStyles();
  
    return (
      <>
      <DashboardNavbar/>
        <div className="chat-container">
          <div className="chat-sidebar">
            Sidebar
          </div>
          <div className="chat-window">
            Main window
          </div>

        
        <div className="chat-rightbar">
          Right bar
        </div>
        </div>
        </>
        )
}

export default MainChat;

