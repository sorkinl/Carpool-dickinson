import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./EachResult.css";
import { Avatar } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import avatar from "../../../static/img/avatar.png";
import PersonIcon from "@material-ui/icons/Person";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LocationCityIcon from "@material-ui/icons/LocationCity";



const useStyles = makeStyles((theme) => ({
  list: {
    width: "400px",
    padding: 0,
    left: 15,
    top: 3,
  },
  ListItem: {
    width: "100%",
    padding: 0,
    margin: 0,
  },
  ListItemIcon: {
    minWidth: "40px",
    padding: 0,
    margin: 0,
  },
  ListItemText: {
    margin: 0,
  },

  avatarSize: {
    width: theme.spacing(14),
    height: theme.spacing(14),
    borderRadius: 10,
  },
}));

function EachResult(props) {
  const classes = useStyles();

  console.log(props)
  return (
    <div>
      <div className="eachResult">
        {/* avatar and nickname */}
        <div className="avatarAndNickname">
          <Avatar
            src={props.info.user.photoUrl}
            variant="square"
            alt="temp"
            className={classes.avatarSize}
          />
          <span className="nickname">{props.nickname}</span>
        </div>
        <List className={classes.list}>
          {/* name */}
          <ListItem button classes={{ root: classes.ListItem }}>
            <ListItemIcon classes={{ root: classes.ListItemIcon }}>
              <PersonIcon />
            </ListItemIcon>
            {/* name */}
            <ListItemText
              classes={{ root: classes.ListItemText }}
              primary={props.info.user.firstName +" " + props.info.user.lastName}
              secondary={props.occupation}
            />
          </ListItem>
          <ListItem button classes={{ root: classes.ListItem }}>
            <ListItemIcon classes={{ root: classes.ListItemIcon }}>
              <LocationOnIcon />
            </ListItemIcon>
            {/* //startinglocation */}
            <ListItemText 
              primary={props.info.originTitle} 
              secondary={props.comment} />
          </ListItem>
          <ListItem button classes={{ root: classes.ListItem }}>
            <ListItemIcon classes={{ root: classes.ListItemIcon }}>
              <LocationCityIcon />
            </ListItemIcon>
            {/* destination */}
            <ListItemText primary= {props.info.destTitle} />
          </ListItem>
          {/* <ListItem classes={{ root: classes.ListItem }}>
            <Rating
              name="rating-for-fun"
              value={props.rating}
              precision={0.5}
              readOnly
            />
          </ListItem> */}
        </List>
      </div>
      <hr />
    </div>
  );
}
export default EachResult;
