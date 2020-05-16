import React from 'react';
import './Account.css'
import Profile from './Profile/Profile';
import TripList from './Trips/TripList';
import {Grid} from '@material-ui/core';

export default class Account extends React.Component {
    render(){
      return (
        <div>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Profile/>
            </Grid>
            <Grid item xs>
              <TripList />
            </Grid>
          </Grid>
        </div>
      );
    }
}
