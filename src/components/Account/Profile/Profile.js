import React, {useState} from 'react';
import './Profile.css';
import avatar from "../../../static/img/avatar.png"
import { EditField } from './EditField';
import { blue } from '@material-ui/core/colors';
import {makeStyles, Button, Avatar, Card, CardHeader, CardMedia, CardContent, CardActions, Typography, Box, Grid} from '@material-ui/core';

const useStyles = makeStyles((theme)=>({
  root: {
    maxWidth: '100%',
    padding: theme.spacing(1),
  },
  avatarSize: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    padding: theme.spacing(2),
  },
  title: {
    fontSize: theme.typography.pxToRem(30),
    flexBasis: '19%',
    flexShrink: 0,
    color: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',//theme.palette.inherit,

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

    const classes = useStyles();

    return(

      <div className={classes.root}>
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
                <Button  color="primary" >
                    Edit profile
                </Button>
              </CardActions>
            </Card>

        <Grid item xs>
        </Grid>
      </div>
    );
}
