import React from 'react';
import './Trip.css';


export class Trip extends React.Component {
  render(){
    const trip = this.props.trip;
    return(
      <div className="Trip">
        <div className="image-container">
          <img src={trip.image} alt='' width="150" height="150"/>
        </div>
        <h3>Date: {trip.date}</h3>
        <div className="Trip-information">
            <p>Departure: {trip.from}</p>
            <p>Destination: {trip.to}</p>
            <p>Cost: {trip.cost}</p>

          <div className="Trip-rating">
            <p>Posted by: <strong>{trip.driver}</strong></p>
            <p>{trip.rating} stars</p>
          </div>
        </div>

      </div>
    );
  }

}
