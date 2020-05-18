import React, {useState, useReducer} from 'react';
import './Profile.css';

import avatar from "../../../static/img/avatar.png"
import EditField from './EditField.js';
import { withStyles } from '@material-ui/core/styles';
import {makeStyles, CssBaseline, Button, Avatar, Card, CardHeader, CardMedia, CardContent, CardActions, Typography, Box, Grid} from '@material-ui/core';

const StyledButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FFB6C1 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 50px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },

})(Button);

const useStyles = makeStyles((theme)=>({
  root: {
    maxWidth: '100%',
    padding: theme.spacing(3),
  },
  avatarSize: {
    width: theme.spacing(19),
    height: theme.spacing(19),
    padding: theme.spacing(2),
  },
  title: {
    fontSize: theme.typography.pxToRem(30),
    flexBasis: '19%',
    flexShrink: 0,
    color: theme.palette.inherit,
  },
  subHeader: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '19%',
    flexShrink: 0,
  },
}));
export default function Profile(props){
    const [isClicked, setClick] = useState(false);

    const [firstName, setFirst] = useState('Naruto');
    const [lastName, setLast] = useState('Le');
    const [email, setEmail] = useState('naruto@gmail.com');
    const [location, setLocation] = useState('Carlisle, PA');

    const [inputValues, setInputValues] = useReducer(
      (state, newState) => ({ ...state, ...newState }),
      {firstName: '', lastName: '', email: '', location: ''}
    );

    const handleOnChange = event => {
      const { name, value } = event.target;
      setInputValues({ [name]: value });
    };


    const classes = useStyles();

      return(

        <div className={classes.root}>
          <Grid item>
              <Card className={classes.root}>
                <CardHeader
                    title={
                      <Typography className={classes.title} variant="h5">{firstName} {lastName}</Typography>
                    }
                    align='left'
                    subheader={
                      <>{location}<br/>{email}</>
                    }
                    avatar={
                      <Avatar src={avatar} aria-label="name" className={classes.avatarSize}>K</Avatar>
                    }
                />
                <CardActions>
                  <StyledButton>
                        Edit profile
                  </StyledButton>
                </CardActions>
              </Card>
          </Grid>


            <EditField/>

        </div>

      );
}
