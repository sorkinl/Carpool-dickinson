import React from 'react';
import  { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
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
import bmcYellow from "../../assets/images/bymycar-yellow.svg";
import mountain from "../../assets/images/mountain.svg";
import adventure from "../../assets/images/adventure.svg";

import AutoOrigin from "./AutoOrigin";
import AutoDestination from "./AutoDestination";

const materialTheme = createMuiTheme({
    overrides: {
      MuiPickersToolbar: {
        toolbar: {
          backgroundColor: "#ffadc7",
        },
      },
      MuiPickersCalendarHeader: {
        switchHeader: {
            fontSize: "20px",
        //   backgroundColor: "fff",
        //   color: "white",
        },
      },
      MuiPickersDay: {
        day: {
          color: "#BA1A4D",
        },
        daySelected: {
          backgroundColor: "#E01F5D",
        },
        dayDisabled: {
          color: "grey",
        },
        current: {
          color: "#BA1A4D",
        },
      },
      MuiPickersModal: {
        dialogAction: {
          color: "#E01F5D",
        },
      },
    },
  });

const useStyles = makeStyles((theme) => ({
    datePicker: {
        width: "25rem",
    },
}));


export default function PostTrip(props) {

    const classes = useStyles();
    var date = new Date();
    date.setUTCHours(0,0,0,0);
    const [state, setState] = React.useState({
        originTitle: '',
        origin: {
            latitude: '',
            longitude: '',
        },
        destTitle: '',
        destination: {
            latitude: '',
            longitude: '',
        },
        departDate: date,
        departTime: '',
        emptySeat: '',
        description: '',
        uid: '',
        firstName: '',
        lastName: '',
        photoUrl: '',
    });
    function handleDateChange(date) {
        date.setUTCHours(0,0,0,0);
        console.log(date)
        setState({...state, departDate: date})
    }
    function handleTimeChange(time) {

    }
    function handleLocationChange(value, name) {
        if(name === "origin"){
            setState({...state, originTitle: value.label})
        } else {
            setState({...state, destTitle: value.label})
        }
        const newValues = {...state};
        newValues[name]["latitude"] = value.lat;
        newValues[name]["longitude"] = value.lng;
        // setState((state)=> ({...state,
        //     [name]: {
        //         latitude: value.lat,
        //         longitude: value.lng,
        //     }
        // })); --> THIS DOESN'T WORK
    }
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
                            <h2>Post A Ride</h2>
                            <div className="form sign-in">
                                <form>
                                    <label htmlFor="origin-field">
                                        <span>Origin*</span>
                                        <AutoOrigin id="origin-field" onSuggestionSelect={handleLocationChange}/>
                                        {/* <input type="text" id="origin-field" required placeholder="From"/> */}
                                    </label>
                                    <label htmlFor="dest-field">
                                        <span>Destination*</span>
                                       <AutoDestination onSuggestionSelect={handleLocationChange}/>
                                        {/* <input type="text"id="dest-field" required placeholder="To"/> */}
                                    </label>

                                    <label htmlFor="date-field">
                                        <span>Date*</span>
                                        <br></br>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <ThemeProvider theme={materialTheme}>
                                                <KeyboardDatePicker
                                                    className={classes.datePicker}
                                                    required
                                                    name="departDate"
                                                    minDate={new Date().setHours(0,0,0,0)}
                                                    //value={state.departDate}
                                                    margin="normal"
                                                    format="MM/dd/yyyy"
                                                    onChange={handleDateChange}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />
                                            </ThemeProvider>
                                        </MuiPickersUtilsProvider>
                                    </label>

                                    <label htmlFor="time-field">
                                        <span>Depart Time*</span>
                                        <br></br>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardTimePicker
                                                required
                                                className={classes.datePicker}
                                                margin="normal"
                                                name="departTime"
                                                //value={state.departTime}
                                                onChange={handleTimeChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change time',
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </label>
                                    
                                    <label htmlFor="empty-seat-field">
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

                                    <label htmlFor="description-field">
                                        <span>Description</span>
                                        <br></br>
                                        <textarea type="text"id="description-field" placeholder="Your description (150 characters max)" 
                                            maxlength="150" cols="60" rows="4">
                                        </textarea>
                                    </label>
                                </form>
                            </div>
                            <div className="sub-cont">
                                <div className="img">
                                    {/* <div className="img__text m--up">
                                        <h2>Ready?</h2>
                                        <p>Post your trip and make some money!</p>
                                    </div> */}
                                    <div className="img__text m--up side-illustration">
                                        <img src={adventure} alt="" className="img__text side-illustration side-image"/>
                                    </div>
                                    <div className="img__text m--up">
                                        <p>Ready to share your ride?</p>
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