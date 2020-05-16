import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './EachResult.css';

import { Avatar} from "@material-ui/core";
import Rating from '@material-ui/lab/Rating';
import {List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

import star from "../../static/img/star.png"
import avatar from "../../static/img/avatar.png"
import PersonIcon from '@material-ui/icons/Person';


import LocationOnIcon from '@material-ui/icons/LocationOn';
import LocationCityIcon from '@material-ui/icons/LocationCity';

const useStyles = makeStyles((theme) => ({
  ListItem:{
    padding:0
  },
  ListItemIcon:{
    minWidth: '40px'
  },
  avatarSize: {
    width: theme.spacing(14),
    height: theme.spacing(14),
  }
}));


function EachResult(props) {

  const classes = useStyles();

  // var passedProps = {
  //   name : this.props.name
  // }

  return (

      <div className="eachResult">

        <Avatar src = {avatar} alt = "temp" className = {classes.avatarSize}  />

        <List className = {classes.root}>

          {/* name */}
          <ListItem button classes = {{root:classes.ListItem}} >
            <ListItemIcon classes = {{root:classes.ListItemIcon}}>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary= {props.name} secondary={props.occupation}/>
          </ListItem>

          <ListItem button classes = {{root:classes.ListItem}} >
            <ListItemIcon classes = {{root:classes.ListItemIcon}}>
              <LocationOnIcon />
            </ListItemIcon>
            <ListItemText primary={props.starting} secondary={props.comment}/>
          </ListItem>

          <ListItem button classes = {{root:classes.ListItem}} >
            <ListItemIcon classes = {{root:classes.ListItemIcon}}>
              <LocationCityIcon/>
            </ListItemIcon>
            <ListItemText primary="Harrisburg" />
          </ListItem>

          <ListItem classes = {{root:classes.ListItem}} >
            <Rating name="half-rating-read" defaultValue={props.rating} precision={0.5} readOnly />
          </ListItem>
        </List>

      </div>



  );
}
export default EachResult;
