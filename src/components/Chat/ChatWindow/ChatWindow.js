import React from "react";
import Grid from "@material-ui/core/Grid"
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField"
import {Stack, Node} from '../../../Utils/Stack';
import "./ChatWindow.css"

const ChatWindow = ({ chatID }) => {
  const messageStack = new Stack();
    // state for the message and arrayOfMessages which later we will get from the database
  const [message, setMessage] = React.useState("");
  const [arrayOfMessages, setArray] = React.useState(["Hey"]);
  // if message is not empty string add new message to array. Note that it is concat() instead of push() because the latter will make mutate the state directly
  // which doesn't work in react
  //After set message to empty
  const sendMessage = () => {
    if(message !== ""){
    setArray(arrayOfMessages.concat(message))
    }
    setMessage("")
}
// function that takes event as a parameter and if is user pressing Enter call sendMessage()
const handleKeyDownEvent = (event) => {
    if (event.key === "Enter"){
        sendMessage();
    }
}

  //const sortMessages = messages.sort((a,b) => new Date(a.created).valueOf() - new Date(b.created).valueOf());
  /* const listMessages = () => {
    messages.map((message) => {
      <p>{message}</p>;
    });
  }; */
  return (
    <>
    <Paper className="main">
      <Grid
      container
      direction="column"
      alignItems="flex-end"
      justify="flex-start">
          {arrayOfMessages.map(message => ( // map() accepts a function as a parameter and executes that function for each element in the array
              <div className="message" key={Math.random() * 100000}><p>{message}</p></div>
          ))}
          
      </Grid>
      </Paper>
      <div className="to-send">
      <TextField onKeyPress={handleKeyDownEvent} label="Message" 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          
          InputProps={{
              className: "textfield"
          }}
          />
        <Button
          className="btn-submit-message"
          onClick={sendMessage}
          variant="contained"
        color="primary"
        endIcon={<Icon>send</Icon>}
        >Send</Button>
      </div>
      </>
  );
};

export default ChatWindow;
