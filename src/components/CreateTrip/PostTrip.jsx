import React from 'react';
import  { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker} from '@material-ui/pickers';
import pink from '@material-ui/core/colors/pink';
import { useSelector } from "react-redux";
import { useFirestore } from 'react-redux-firebase';
import firebase from "../../firebase/firebaseConfig";
import {
    CssBaseline,
    Snackbar
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import {
    faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import bmcYellow from "../../assets/images/bymycar-yellow.svg";
import mountain from "../../assets/images/mountain.svg";
import adventure from "../../assets/images/adventure.svg";

import AutoOrigin from "./AutoOrigin";
import AutoDestination from "./AutoDestination";

const defaultMaterialTheme = createMuiTheme({
    palette: {
      primary: pink,
    },
    overrides: {
        MuiAlert: {
            root: {
                fontFamily: "Lato, sans-serif",
                fontSize: "1.6rem",
            },
            message: {
                transition: "ease 3s"
            }
        }
    }
});
const useStyles = makeStyles((theme) => ({
    dateTimePicker: {
        width: "22rem",
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function PostTrip(props) {
    const classes = useStyles();
    const user = useSelector(state => state.firebase.profile);
    const firestore = useFirestore();
    const [error, setError] = React.useState(false);
    const [submit, setSubmit] = React.useState(false);

    let currentDate = new Date();
    let departTime ='';
    currentDate.setUTCHours(0,0,0,0);

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
        departDate: currentDate,
        emptySeat: '',
        description: '',
        uid: firebase.auth().currentUser.uid,
        firstName: user.firstName,
        lastName: user.lastName,
        photoUrl: user.photoUrl,
    });
    const [timeToPick, setTimePick] = React.useState(new Date());

    function handleChange(e) {  
        const { name, value } = e.target;
        if (name === "selector") {
            setState((state) => ({ ...state, ['emptySeat']: value })); 
        }
        else {
            setState((state) => ({ ...state, [name]: value }));
        } 
    }
    function handleDateChange(date) {
        date.setUTCHours(0,0,0,0);
        setState({...state, departDate: date})
    }
    function handleTimeChange(timeToPick) {
        setTimePick(timeToPick);
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
    }
    function handleClose() {
        setError(false);
    };
    function checkEmptyInput() {
        if(state.originTitle === ""
            || state.destTitle === ""
            || state.emptySeat === "") {
            return false;
        } else {
            return true;
        }
    }
    const submitTrip = async () => {
        try {
            await firestore.collection("trips").add({...state, departTime});
        }
        catch (error) {
            console.log("Create Trip error", error);
        }
    }
    function handleSubmit(e) {
        e.preventDefault();
        if(checkEmptyInput() === false) {
            setError(true);
            console.log({...state});
        }
        else {
            departTime = timeToPick.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            console.log(departTime);
            console.log({...state});
            submitTrip();
            setSubmit(true);
        }
    };
    // console.log("curren time: ",currentTime);
    return (
        <CssBaseline>
            <header className="account-page">
                <div  className="post-trip">
                    <a href='/dashboard' className="post-trip-btn post-trip-btn--back">
                            <span><FontAwesomeIcon className="post-trip-icon" icon={faChevronLeft}></FontAwesomeIcon></span>
                            Back to dashboard
                    </a>
                    <div className="post-trip-main">
                        <div className="post-trip-cont">
                            <div className="post-trip-cont__boxTitle">
                                <p className="post-trip-cont__boxTitle__text">Post A Ride</p>
                            </div>
                            {/* <h2>Post A Ride</h2> */}
                            <div className="post-trip-form post-trip-sign-in">
                                <form >
                                    <label htmlFor="origin-field">
                                        <span>Origin*</span>
                                        <AutoOrigin id="origin-field" onSuggestionSelect={handleLocationChange}/>
                                    </label>
                                    <label htmlFor="dest-field">
                                        <span>Destination*</span>
                                       <AutoDestination onSuggestionSelect={handleLocationChange}/>
                                    </label>

                                    <label htmlFor="date-field">
                                        <span>Date*</span>
                                        <br></br>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <ThemeProvider theme={defaultMaterialTheme}>
                                                <KeyboardDatePicker
                                                    required
                                                    className={classes.dateTimePicker}
                                                    name="departDate"
                                                    margin="normal"
                                                    minDate={new Date().setHours(0,0,0,0)}
                                                    value={state.departDate}
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
                                            <ThemeProvider theme={defaultMaterialTheme}>
                                                <KeyboardTimePicker
                                                    required
                                                    className={classes.dateTimePicker}
                                                    name="departTime"
                                                    margin="normal"
                                                    value={timeToPick}
                                                    onChange={handleTimeChange}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change time',
                                                    }}
                                                />
                                            </ThemeProvider>
                                        </MuiPickersUtilsProvider>
                                    </label>
                                    <label htmlFor="empty-seat-field">
                                        <span>Empty seats</span>
                                        <br></br>
                                        <form name="emptySeat" value={state.emptySeat} onChange={handleChange}> 
                                            <div className="post-trip-seat-radio-group">
                                            <input type="radio" id="seat-1" name="selector" value="1"/>
                                                <label for="seat-1" className="post-trip-radio-label">
                                                    <p>1</p>
                                                </label>
                                            <input type="radio" id="seat-2" name="selector" value="2"/>
                                                <label for="seat-2" className="post-trip-radio-label">
                                                    <p>2</p>
                                                </label>
                                            <input type="radio" id="seat-3" name="selector" value="3"/>
                                                <label for="seat-3" className="post-trip-radio-label">
                                                    <p>3</p>
                                                </label>
                                            <input type="radio" id="seat-4" name="selector" value="4"/>
                                                <label for="seat-4" className="post-trip-radio-label">
                                                    <p>4</p>
                                                </label>
                                            <input type="radio" id="seat-5" name="selector" value="5"/>
                                                <label for="seat-5" className="post-trip-radio-label">
                                                    <p>5</p>
                                                </label>
                                            <input type="radio" id="seat-6" name="selector" value="6"/>
                                                <label for="seat-6" className="post-trip-radio-label">
                                                    <p>6</p>
                                                </label>
                                            <input type="radio" id="seat-7" name="selector" value="7"/>
                                                <label for="seat-7" className="post-trip-radio-label">
                                                    <p>7</p>
                                                </label>
                                            </div>
                                        </form>
                                    </label>
                                   
                                    <label htmlFor="description-field">
                                        <span>Description</span>
                                        <br></br>
                                        <textarea type="text"id="description-field" 
                                                    placeholder="Your description/message" 
                                                    maxlength="150" cols="60" rows="4"
                                                    name="description"
                                                    onChange={handleChange}
                                                    value={state.description}
                                                    className="post-description-box">
                                        </textarea>
                                    </label>
                                </form>
                            </div>
                            <div className="post-trip-sub-cont">
                                <div className="post-trip-img">
                                    <div className="post-trip-img__text m--up side-illustration">
                                        <img src={adventure} alt="" className="post-trip-img__text side-illustration side-image"/>
                                    </div>
                                    <div className="post-trip-img__text m--up">
                                        <p>Ready to share your ride?</p>
                                    </div>
                                    <div className="post-trip-img__btn" onClick={handleSubmit}>
                                        <span className="m--up">Submit</span>
                                        {/* <span className="m--in">Sign In</span> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Snackbar open={error}
                              autoHideDuration={6000}
                              onClose={handleClose}
                              anchorOrigin={{
                                  vertical: 'top',
                                  horizontal: 'center',
                              }}>
                        <ThemeProvider theme={defaultMaterialTheme}>
                            <Alert onClose={handleClose} severity="error">
                                Required fields missing!
                            </Alert>
                        </ThemeProvider>
                    </Snackbar>
                </div>
            </header>
        </CssBaseline>
    );
}