import React from "react";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import { Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import "./ChatWindow.css";

const ChatWindow = (props) => {
  const [message, setMessage] = React.useState("");
  const [arrayOfMessages, setArray] = React.useState(["Hey"]);

  const sendMessage = () => {
    if (message !== "") {
      setArray(arrayOfMessages.concat(message));
    }
    setMessage("");
  };
  const handleKeyDownEvent = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  
  return (
    <>
      <Paper className="main">
        <Grid
          container
          direction="column"
          alignItems="flex-end"
          justify="flex-start"
        >
          {arrayOfMessages.map((message) => (
            <div className="message" key={Math.random() * 100000}>
              <p>{message}</p>
            </div>
          ))}
        </Grid>
      </Paper>
      <div className="to-send">
        <TextField
          onKeyPress={handleKeyDownEvent}
          label="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          InputProps={{
            className: "textfield",
          }}
        />
        <Button
          className="btn-submit-message"
          onClick={sendMessage}
          variant="contained"
          color="primary"
          endIcon={<Icon>send</Icon>}
        >
          Send
        </Button>
      </div>
    </>
  );
};

export default ChatWindow;
