import React, {useState} from 'react';
import unnamed from '../../../assets/images/unnamed.jpg';
import { useSelector } from 'react-redux';
import {
    Grid,
} from '@material-ui/core';
import {Link } from 'react-router-dom';
import PhotoConsole from "./PhotoConsole";

//To be improved:
// + Image preview should be scalable, but not compressed

/* Display the profile basic info */
export default function Profile(props) {
    const user = useSelector(state => state.firebase.profile);
    const [urlExists, setUrlExists] = useState(user.photoUrl);

    function updatePhotoUrl(url) {
        setUrlExists(url);
    }
    return (
        <div>
            <div className="profile-card outer-div">
                <div className="profile-card inner-div">
                    <div className="profile-card front">
                        {/* <div className="profile-card front__bkg-photo"></div> */}
                        <p className="section-name">Profile</p>
                        <img disabled={urlExists !== ""} className="profile-card front__face-photo front__face-photo--none" src={unnamed} alt=""/>
                        <img className="profile-card front__face-photo front__face-photo--existing"
                            src={user.photoUrl}
                            alt=""
                        />
                        <span className="profile-card front__photo-console">
                            <PhotoConsole onUrlExists={updatePhotoUrl} urlExists={urlExists}/> 
                        </span>
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
                                <Link to="/edit-profile" className="btn btn--editProfile">
                                    Edit profile
                                </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    )
}
