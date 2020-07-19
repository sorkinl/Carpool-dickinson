import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./EachResult.scss";
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
  console.log(props)
  const classes = useStyles();

  return (
   
    <div className = "EachResult__main">
      <div className = "info">
        <div className = "EachResult__headingInfo">
          <div className = "EachResult__address">
            {props.info.destTitle}
          </div>
          <div className = "EachResult__date">
           {props.info.departDate}
          </div>
        </div>
        <div className = "EachResult__text">
          <div className = "EachResult__comma">
            “
          </div>
          <div className = "EachResult__description">
            {props.info.departTime}
          </div>
          
        </div>
      </div>
      <div className="EachResult__profile">
        <div className = "EachResult__avatar">
          <Avatar src = {props.info.user.photoUrl} style = {{width:"60px", height:"60px"}}/>
        </div>
        <div className = "EachResult__profile__info">
          <div className = "EachResult__profile__name">
            {props.info.user.firstName} {props.info.user.lastName} 
          </div>
          <div className = "EachResult__profile__year">
            Dickinsonian '22'
          </div>
        </div>
      </div>
    </div>
  );
}
export default EachResult;
