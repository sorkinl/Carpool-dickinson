import React from 'react'
import icon from "../../assets/sprite.svg";
import avatar from "../../static/img/avatar.png";
import TripCard from './TripCard';
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import Loading from '../Loading';
const DashboardMain = () => {
  
  useFirestoreConnect([{
    collection: 'trips',
    limit: 5,
    storeAs: 'recentTrips'
  }])

  const recentTrips = useSelector(state => state.firestore.ordered.recentTrips)
    
    return(
        <main className="main-dash">
            <div className="main-dash__trip-header">
              <h1 className="main-dash__trip-heading">Most recent trips</h1>
              <div className="main-dash__arrows">
                <svg className="main-dash__arrow-icon">
                  <use xlinkHref={`${icon}#icon-chevron-thin-left`}></use>
                </svg>
                <svg className="main-dash__arrow-icon">
                  <use xlinkHref={`${icon}#icon-chevron-thin-right`}></use>
                </svg>
              </div>
            </div>

            <div className="main-dash__trip-section">
              {isLoaded(recentTrips) ? recentTrips.map((trip) => 
                <TripCard
                key={trip.id}
                firstName={trip.firstName}
                lastName={trip.lastName}
                destTitle={trip.destTitle}
                originTitle={trip.originTitle}
                departDate={trip.departDate}
                departTime={trip.departTime}
                />
              ): <Loading/>}
              
            </div>
          </main>
    )
}


export default DashboardMain;