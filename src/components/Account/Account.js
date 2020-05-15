import React from 'react';
import './Account.css'
import Profile from './Profile/Profile';
import TripList from './Trips/TripList';

export default class Account extends React.Component {
    render(){
      return (
        <div>
          <Profile/>
          <TripList/>
        </div>
      )
    }
}
