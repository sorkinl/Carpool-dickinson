import React, {useState} from 'react';
import unnamed from '../../../assets/images/unnamed.jpg';
import {
    Grid,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import {Link } from 'react-router-dom';

/* Display the profile basic info */
export default function Profile(props){
    const [isClicked, setClick] = useState(false);

    const user = useSelector(state => state.firebase.profile);
    return (
        <div className="profile-card outer-div">
            <div className="profile-card inner-div">
                <div className="profile-card front">
                    {/* <div className="profile-card front__bkg-photo"></div> */}
                    <p className="section-name">Profile</p>
                    <img className ="profile-card front__face-photo" 
                        src={unnamed}
                        //src={user.photoUrl}
                        alt={unnamed}/>
                    <div className="profile-card front__text">
                        <h3 className="profile-card front__text-header">{user.firstName} {user.lastName}</h3>
                        <p className="profile-card front__text-para">{user.school} | {user.classYear}</p>

                        <Grid container className="record-profile">
                            <Grid item xs={3}>
                                <p className="record-main">7</p>
                                <p className="record-sub">offers</p>
                            </Grid>
                            <div className="record-line"></div>
                            <Grid item xs={3}>
                                <p className="record-main">10</p>
                                <p className="record-sub">rides</p>
                            </Grid>
                            <div className="record-line"></div>
                            <Grid item xs={3}>
                                <p className="record-main">20</p>
                                <p className="record-sub">reviews</p>
                            </Grid>
                        </Grid>
                        {/* <Link to="/edit-profile" className="btn btn--editProfile"> */}
                            <Link to="/edit-profile" className="btn btn--editProfile">
                                Edit profile
                            </Link>
                        {/* </Link> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
