import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker} from '@material-ui/pickers';
import { useSelector } from "react-redux";
import { useFirestore } from 'react-redux-firebase';
import firebase from "../../firebase/firebaseConfig";
import {
    CssBaseline,
} from '@material-ui/core';
import {
    faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PostTrip(props) {
    return (
        <CssBaseline>
            <header className="account-page">
                <div  className="post-trip">
                    <a href='/dashboard' className="post-trip-btn post-trip-btn--back">
                            <span><FontAwesomeIcon className="post-trip-icon" icon={faChevronLeft}></FontAwesomeIcon></span>
                            Back to dashboard
                    </a>
                    <div className="post-trip-main">
                        <div className="cont">
                            <h2>Welcome,</h2>
                            <div className="form sign-in">
                                <form>
                                    <label for="origin-field">
                                        <span>Origin*</span>
                                        <input type="text" id="origin-field" required placeholder="From"/>
                                    </label>
                                    <label for="dest-field">
                                        <span>Destination*</span>
                                        <input type="text"id="dest-field" required placeholder="To"/>
                                    </label>
                                    <label for="description-field">
                                        <span>Description</span>
                                        <br></br>
                                        <textarea type="text"id="description-field" placeholder="Your description (150 characters max)" 
                                            maxlength="150" cols="60" rows="4">
                                        </textarea>
                                    </label>

                                    <label for="empty-seat-field">
                                        <span>Empty seats</span>
                                        <br></br>
                                        <form>
                                            <div className="seat-radio-group" name="emptySeat">
                                            <input type="radio" id="seat-1" name="selector" value="1"/>
                                                <label for="seat-1" className="radio-label">
                                                    <p className="seat-value">1</p>
                                                </label>
                                            <input type="radio" id="seat-2" name="selector" value="2"/>
                                                <label for="seat-2" className="radio-label">
                                                    <p className="seat-value">2</p>
                                                </label>
                                            <input type="radio" id="seat-3" name="selector" value="3"/>
                                                <label for="seat-3" className="radio-label">
                                                    <p className="seat-value">3</p>
                                                </label>
                                            <input type="radio" id="seat-4" name="selector" value="4"/>
                                                <label for="seat-4" className="radio-label">
                                                    <p className="seat-value">4</p>
                                                </label>
                                            <input type="radio" id="seat-5" name="selector" value="5"/>
                                                <label for="seat-5" className="radio-label">
                                                    <p className="seat-value">5</p>
                                                </label>
                                            <input type="radio" id="seat-6" name="selector" value="6"/>
                                                <label for="seat-6" className="radio-label">
                                                    <p className="seat-value">6</p>
                                                </label>
                                            <input type="radio" id="seat-7" name="selector" value="7"/>
                                                <label for="seat-7" className="radio-label">
                                                    <p className="seat-value">7</p>
                                                </label>
                                            </div>
                                        </form>
                                    </label>
                                </form>
                            </div>
                            <div className="sub-cont">
                                <div className="img">
                                    <div className="img__text m--up">
                                        <h2>Ready?</h2>
                                        <p>Post your trip and make some money!</p>
                                    </div>
                                    <div className="img__btn">
                                        <span className="m--up">Submit</span>
                                        {/* <span className="m--in">Sign In</span> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </CssBaseline>
    );
}