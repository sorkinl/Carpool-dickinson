import React from "react";
import Grid from "@material-ui/core/Grid"
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField"
import "./ChatWindow.css"

const ChatWindow = ({ chatID }) => {
  const [message, setMessage] = React.useState("");
  const [arrayOfMessages, setArray] = React.useState(["Hey"]);
  const sendMessage = () => {
    if(message != ""){
    setArray(arrayOfMessages.concat(message))
    }
    setMessage("")
}
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
    <Paper>
      <Grid
      container
      direction="column"
      allignItems="flex-end"
      justify="flex-start">
          {arrayOfMessages.map(message => (
              <div className="message"><p>{message}</p></div>
          ))}
      </Grid>
      <div className="to-send">
      <TextField onKeyPress={handleKeyDownEvent} label="Message" 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="textarea"
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
      </Paper>
  );
};

export default ChatWindow;
