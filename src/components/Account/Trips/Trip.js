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
        <h3>Date: {trip.date}</h3><br/>
        <div className="Trip-information">
            <p>Departure: {trip.from}</p><br/>
            <p>Destination: {trip.to}</p><br/>
            <p>Cost: {trip.cost}</p>

          <div className="Trip-rating">
            <h3>Posted by: {trip.driver}</h3>
            <p>{trip.rating} stars</p>
          </div>
        </div>

      </div>
    );
  }

}
