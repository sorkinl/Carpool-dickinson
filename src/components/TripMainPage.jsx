import React from 'react';
import './TripMainPage.css'
import Avatar from '@material-ui/core/Avatar'

const TripMainPage = () => {
    return (
        <>
            <div className="trip-box">
                <div className="heading">
                    <Avatar className="avatar"/>
                    <h2 className="trip-heading">Leo Sorkin</h2>
                    <span className="trip-sub">Dickinson College</span>
                </div>
                <hr></hr>
                <div className="trip-body">
                    <p>from: <span>Dickinson College</span></p>
                    <p>to: <span>Walmart, Carlisle</span></p>
                    <p>date: <span>07/12/2020</span></p>
                    <p>time: <span>5 pm</span></p>
                    <p>details: <span>buy me cookies</span></p>
                </div>
            </div>
        </>
    )
}

export default TripMainPage