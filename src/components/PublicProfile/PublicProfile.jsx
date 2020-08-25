import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import firebase from "../../firebase/firebaseConfig";
import Rating from '@material-ui/lab/Rating';
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import {
    Grid,
    Chip,
} from '@material-ui/core';
import {
    faEnvelope,
    faPhoneAlt,
    faStar,
    faCheckCircle,
    faTimesCircle,
    faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link } from 'react-router-dom';
import Loading from '../Loading';
import  { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import byRoad from '../../assets/images/bytheroad.svg';
import tree from '../../assets/images/trees.svg';


const defaultMaterialTheme = createMuiTheme({
    overrides: {
        MuiChip: {
            label: {
                fontSize: "1.6rem",
                fontFamily: "Lato, sans-serif",

            },
            outlinedPrimary: {
                color: "#38a1fd",
                borderColor: "#38a1fd",
            }
        }
    }
});
/* Display the public user profile */
export default function PublicProfile (props) {
   
    const userId = props.match.params.userId;
    useFirestoreConnect([{
        collection: 'users',
        doc: userId,
        storeAs: 'publicUser'
      }]);
    const publicUser = useSelector(state => state.firestore.ordered.publicUser);
    function handleClick() {
        //to copy
    }
    return (
        <div >
            {isLoaded(publicUser) ? 
            <div className="public-profile-page">
                <div  className="public-profile--public-back-box">
                    <a href='/dashboard' className="public-profile--public-back-box__btn">
                            <span><FontAwesomeIcon className="public-profile--public-back-box__icon" icon={faChevronLeft}></FontAwesomeIcon></span>
                                Back to dashboard
                    </a>
                </div>
                <div className="public-profile public-outer-div">
                    <div className="public-profile public-inner-div">
                        <div className="public-profile public-front">
                            <p className="public-section-name">Profile</p>
                            {/* <img disabled={urlExists !== ""} className="profile-card front__face-photo front__face-photo--none" src={unnamed} alt=""/> */}
                            <img className="public-profile public-front__face-photo public-front__face-photo--existing"
                                src={publicUser[0].photoUrl}
                                alt=""
                            />
                            <div className="public-profile public-front__text">
                                    <h3 className="public-profile public-front__text-header">{publicUser[0].firstName} {publicUser[0].lastName}</h3>
                                    <p className="public-profile public-front__text-para">{publicUser[0].school} | {publicUser[0].classYear}</p>
                                    <Grid container className="public-record-profile">
                                        <Grid item xs={3}>
                                            <p className="public-record-main">7</p>
                                            <p className="public-record-sub">people driven</p>
                                        </Grid>
                                        <div className="public-record-line"></div>
                                        <Grid item xs={3}>
                                            <p className="public-record-main">10</p>
                                            <p className="public-record-sub">rides taken</p>
                                        </Grid>
                                        <div className="public-record-line"></div>
                                        <Grid item xs={3}>
                                            <p className="public-record-main">20</p>
                                            <p className="public-record-sub">reviews</p>
                                        </Grid>
                                    </Grid>
                            </div>
                            {/* --------------- BIO ------------*/}
                            <div className="public-profile public-front__info">
                                <Grid container className="public-info-wrapper">
                                    <Grid item xs sm={3}>
                                        <h1>Bio</h1>
                                    </Grid>
                                    <Grid item xs sm={6}>
                                        <p>I'm very quiet I'm very quiet I'm very quiet I'm very quiet I'm very quiet I'm very quietI'm very quiet</p>
                                    </Grid>
                                </Grid>
                                {/* --------------- VERIFICATION ------------*/}
                                <Grid container className="public-info-wrapper">
                                    <Grid item xs sm={3}>
                                        <h1>Verification</h1>
                                    </Grid>
                                    <Grid item xs sm={6}>
                                        <p>School Email<span className="public-info-wrapper__icon public-info-wrapper__icon--verified"><FontAwesomeIcon icon={faCheckCircle}/></span></p>
                                        <p>Phone Number<span className="public-info-wrapper__icon public-info-wrapper__icon--unverified"><FontAwesomeIcon icon={faTimesCircle}/></span></p>
                                    
                                    </Grid>
                                </Grid>
                                {/* ---------------REVIEWS ------------*/}
                                <Grid container className="public-info-wrapper">
                                    <Grid item xs sm={7}>
                                        <h1>Reviews (20)</h1>
                                    </Grid>
                                    <Grid item xs sm={2} className="review-card--user-rating">
                                    <h2>4.6<span className="public-info-wrapper__icon public-info-wrapper__icon--star"><FontAwesomeIcon icon={faStar}/></span></h2>
                                    </Grid>
                                </Grid>
                                <Grid container className="public-info-wrapper">
                                    <Grid item xs={6} sm={7}>
                                        <div className="review-card">
                                            <Grid container className="review-card--grid">
                                                <Grid item xs sm={2}>
                                                    <img className="review-card--avatar"
                                                        src={publicUser[0].photoUrl}
                                                        alt=""
                                                    />   
                                                </Grid>
                                                <Grid item xs sm={10}>
                                                    <p className="review-card--name">
                                                        Caitlyn Nguyen
                                                    </p>
                                                    <p className="review-card--history">
                                                        Dickinson College to Harrisburg on March 4, 2020 
                                                    </p>
                                                    <p className="review-card--content">
                                                        Very nice and friendly person. Would definitely recommend her as a driver and passenger
                                                    </p>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} sm={2}>
                                        <div className="review-card--user-rating">
                                            <Rating name="read-only" precision={0.1} value={4.6} size="large" readOnly/>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid container className="public-info-wrapper">
                                    <Grid item xs={6} sm={7}>
                                        <div className="review-card">
                                            <Grid container className="review-card--grid">
                                                <Grid item xs sm={2}>
                                                    <img className="review-card--avatar"
                                                        src={publicUser[0].photoUrl}
                                                        alt=""
                                                    />   
                                                </Grid>
                                                <Grid item xs sm={10}>
                                                    <p className="review-card--name">
                                                        Caitlyn Nguyen
                                                    </p>
                                                    <p className="review-card--history">
                                                        Dickinson College to Harrisburg on March 4, 2020 
                                                    </p>
                                                    <p className="review-card--content">
                                                        Very nice and friendly person. Would definitely recommend her as a driver and passenger
                                                    </p>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} sm={2}>
                                        <div className="review-card--user-rating">
                                            <Rating name="read-only" precision={0.1} value={4.6} size="large" readOnly/>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid container className="public-info-wrapper">
                                    <Grid item xs sm={7}>
                                        <a className="public-info-wrapper__view-all" href="#">View all</a>
                                    </Grid>
                                </Grid>
                                {/* --------------- VEHICLE ------------*/}
                                <Grid container className="public-info-wrapper">
                                    <Grid item xs sm={3}>
                                        <h1>Vehicle</h1>
                                    </Grid>
                                    <Grid item xs sm={6}>
                                       <p>Honda Cr-V 2002 Silver</p>
                                    </Grid>
                                </Grid>
                                {/* --------------- CONTACT ------------*/}
                                <Grid container className="public-info-wrapper">
                                    <Grid item xs sm={3}>
                                        <h1>Contact</h1>
                                    </Grid>
                                    <Grid item xs sm={6}>
                                        <ThemeProvider theme={defaultMaterialTheme}>
                                            <Chip icon={<FontAwesomeIcon className="public-info-wrapper__icon--contact" size="2x" icon={faEnvelope}/>} 
                                                label={publicUser[0].email} variant="outlined" color="primary" onClick={handleClick}/>
                                            <span className="break"></span>
                                            <Chip icon={<FontAwesomeIcon className="public-info-wrapper__icon--contact" size="2x" icon={faPhoneAlt}/>} 
                                                label={publicUser[0].phone} variant="outlined" color="primary" onClick={handleClick}/>
                                        </ThemeProvider>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="public-profile__bottom-illustration-left">
                        <img src={tree} alt="" className="public-profile__bottom-illustration-left--image"/>
                </div>
                <div className="public-profile__bottom-illustration-right">
                        <img src={tree} alt="" className="public-profile__bottom-illustration-right--image"/>
                </div>

            </div>
            : <Loading/>}
        </div>  
    )
}
