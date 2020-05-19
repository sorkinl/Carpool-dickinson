import React, {useState, useReducer} from 'react';
import './Profile.css';

import avatar from "../../../static/img/avatar.png"
import EditButton from './EditButton.js';
import EditField from './EditField.js';
import { withStyles } from '@material-ui/core/styles';
import {makeStyles, CssBaseline, Button, Avatar, Card, CardHeader, CardMedia, CardContent, CardActions, Typography, Box, Grid, Collapse} from '@material-ui/core';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';

const useStyles = makeStyles((theme)=>({
  root: {
    maxWidth: '100%',
    padding: theme.spacing(3),
  },
  avatarSize: {
    width: theme.spacing(19),
    height: theme.spacing(19),
    padding: theme.spacing(0),
  },
  title: {
    fontSize: theme.typography.pxToRem(29),
    flexBasis: '19%',
    flexShrink: 0,
    color: theme.palette.inherit,
  },
  subHeader: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '19%',
    flexShrink: 0,
  },
  submit: {
    margin: theme.spacing(3,3, 2),
  },
}));
export default function Profile(props){
    const [isClicked, setClick] = useState(false);
    const [isUpdated, setUpdate] = useState(false);

    const [input, setInput] = useReducer(
      (state, newState) => ({ ...state, ...newState }),
      {firstName: 'Naruto', lastName: 'Le', email: 'naruto@gmail.com', location: 'Carlisle, PA', phoneNum: '', }
    );

    const handleOnChange = event => {
        const { name, value } = event.target;
        setInput({ [name]: value });
    };
    const classes = useStyles();
      return(
        <div className={classes.root}>
          <Grid item>
              <Card className={classes.root}>
                <CardHeader
                    title={
                      <Typography className={classes.title} variant="h5">{input.firstName} {input.lastName}</Typography>
                    }
                    align='left'
                    subheader={
                      <>{input.location}<br/>{input.email}</>
                    }
                    avatar={
                      <Avatar src={avatar} aria-label="name" className={classes.avatarSize}>K</Avatar>
                    }
                />
                <CardActions disableSpacing>
                  <EditButton onClick={()=>{setClick(!isClicked)}} status={isClicked}/>
                </CardActions>
                <Collapse in={isClicked} timeout="auto" unmountOnExit>
                  <CardContent>
                      <EditField {...input} onEdit={handleOnChange} status={isUpdated}/>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        startIcon={<SystemUpdateAltIcon />}
                        onClick={()=>{setUpdate(true)}}
                      >
                        Save Update
                      </Button>
                  </CardContent>
                </Collapse>
              </Card>
          </Grid>
        </div>
      );
}
