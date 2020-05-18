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
import {Stack, Node} from '../../../Utils/Stack';
import {useStyles} from './mainChatStyles';



const MainChat = () => {
  const classes = useStyles();
  const messageStack = new Stack();
    return (<div className={classes.root}>
        <CssBaseline>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
            <Toolbar/>
          <div className={classes.drawerContainer}>
          <List>
            {['Jerry', 'Monkey', 'Vladimir', 'Covid'].map((text) => (
              <ListItem button key={text}>
                <ListItemIcon><PersonInChat/></ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          </div>
        </Drawer>
        <main className={classes.content}>
          <ChatWindow/>
        </main>
        </CssBaseline>
      </div>)
}

export default MainChat;

