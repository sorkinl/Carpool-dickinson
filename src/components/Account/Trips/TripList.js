import React from 'react';
import './TripList.css';
import Trip from './Trip';

const trip = {
  image: "https://cdn.aarp.net/content/dam/aarp/travel/tips/2020/05/1140-person-driving.jpg",
  date: "mm/dd/yyyy",
  cost: "$3.05",
  from: "Carlisle",
  to: "New York",
  first: "Miyamoto",
  last: "Smith",
  school: "Dickinson College",
  rating: 4.5
};

const futureTripList = [trip, trip, trip];
const pastTripList = [trip, trip, trip];

export default class TripList extends React.Component {

  constructor(props){
    super(props);
    this.state = { fuTrip: false, pastTrip: false }
    this.lists = {
      fuTripList: futureTripList,
      pastTripList: pastTripList
    }
    this.futureTripClick=this.handleClick.bind(this,'fuTrip');
    this.pastTripClick=this.handleClick.bind(this,'pastTrip');
    //this.handleClick = this.handleClick.bind(this);
  }

  handleClick(keyName){
    this.setState({ [keyName]: !this.state.keyName});//!this.state.keyname
  }

  render(){
    console.log(this.state.fuTrip);
    console.log(this.handleClick);
    console.log(this.lists.fuTripList);
    return (
      <div className="TripList">
        <h1>My Trips</h1>
        <div>

            <button onClick={this.futureTripClick}>View upcoming trips</button>
            <div className="Future-trip-list">
                { this.state.fuTrip == true &&
                    this.lists.fuTripList.map(trip => {return (<Trip trip={trip}/>);})
                }
            </div>

            <button onClick={this.pastTripClick}>View past trips</button>
            <div className="Past-trip-list">
                {this.state.pastTrip == true &&
                    this.lists.pastTripList.map(trip => {return (<Trip trip={trip}/>);})
                }
            </div>

        </div>
      </div>
    );
   }
 }
