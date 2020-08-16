import React, { useState } from 'react';
import  { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker} from '@material-ui/pickers';
import pink from '@material-ui/core/colors/pink';
import { useSelector } from "react-redux";
import { useFirestore } from 'react-redux-firebase';
import firebase from "../../firebase/firebaseConfig";
import Loader from 'react-loader-spinner'
import {
    CssBaseline,
    Snackbar,
    Link,
    Grid,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import {
    faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import {
    faCheckCircle,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import adventure from "../../assets/images/adventure.svg";
import world from "../../assets/images/world.svg";
import AutoOrigin from "./AutoOrigin";
import AutoDestination from "./AutoDestination";

//To be improved:
// make "Post new trip" button on confirmation page work

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
        },
        MuiButton: {
            label: {
                fontSize: "1.5rem",
            }
        },
        MuiTypography: {
            colorInherit: {
                fontSize: "1.4rem",
            },
            body1: {
                fontWeight: "400",
                fontSize: "1.5rem",
            },
            subtitle1: {
                fontSize: '1.5rem'
            }
        },
        MuiPickersCalendarHeader: {
            dayLabel: {
                fontSize: "1.4rem",
            }
        },
        MuiPickersModal: {
            dialogRoot: {
                borderRadius: '2rem',
                minWidth: "32rem",
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
    const [errorEmpty, setEmptyError] = useState(false);
    const [errorTime, setTimeError] = useState(false);
    const [isSubmitted, setSubmit] = useState("listening");
    const [showSpinner, setSpinner] = useState("");
    const [timeToPick, setTimePick] = useState(new Date());

    let currentDate = new Date();
    let departTime ='';
    currentDate.setUTCHours(0,0,0,0);

    const [state, setState] = useState({
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
        setEmptyError(false);
        setTimeError(false);
        setSubmit("listening");
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
    function checkValidDateTime() {
        if(state.departDate == "Invalid Date" || timeToPick == "Invalid Date"){
            return false;
        }
        else {
            return true;
        }
    }
    function handleSubmit(e) {
        e.preventDefault();
        if(checkEmptyInput() === false) {
            setEmptyError(true);
            console.log({...state}, "empty inputs");
        }
        else if(checkValidDateTime() === false) {
            setTimeError(true);
        }
        else {
            departTime = timeToPick.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            console.log({...state}, "pre-submit success");
            submitTrip();
        }
    };
    const submitTrip = async () => {
        try {
            setSubmit("pending");
            setSpinner(true);
            await firestore.collection("trips").add({...state, departTime});
            setSpinner(false);
        }
        catch (error) {
            console.log("Error creating trip in submitTrip(): ", error);
            setSubmit("submit-error");
            setSpinner("not active");
        }
        finally {
            console.log("End of submitTrip()");
        }
    }
    return (
        <CssBaseline>
            <header className="post-trip-page">
                <div  className="post-trip">
                    <a href='/dashboard' className="post-trip-btn post-trip-btn--back">
                        <span><FontAwesomeIcon className="post-trip-icon" icon={faChevronLeft}></FontAwesomeIcon></span>
                            Back to dashboard
                    </a>
                    <div className="post-trip-main">
                         <div className="post-trip-cont">
                            <div disabled={showSpinner === false} className="post-trip-cont--front-content">
                                <div className="post-trip-cont__boxTitle">
                                    <p className="post-trip-cont__boxTitle__text">Post A Ride</p>
                                </div>
                                <div className="post-trip-form post-trip-front-page">
                                    <form>
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
                            </div>
                            <div className="post-trip-sub-cont">
                                <div className="post-trip-img">
                                    <div className="post-trip-img__text side-illustration">
                                        <img src={adventure} alt="" className="post-trip-img__text side-illustration side-image"/>
                                    </div>
                                    <div className="post-trip-img__text">
                                        <p>Ready to share your ride?</p>
                                    </div>
                                    { (isSubmitted === "listening" || isSubmitted ==="submit-error") ? 
                                        <a href="/postTrip/confirm">
                                            <div className="post-trip-img__btn" onClick={handleSubmit}>
                                                <span className="submit-post-trip">Submit</span>
                                            </div>
                                        </a>
                                    :   <div className="post-trip-img__text m--up mini-loader">
                                            <Loader
                                                type= "BallTriangle" //"ThreeDots"//
                                                color="#fff"
                                                height={100}
                                                width={100}
                                                visible={showSpinner === true}
                                            />
                                        </div>
                                    } 
                                </div>
                            </div>
                            
                            { showSpinner === false ? 
                            <div className="post-trip-confirm">
                                <p className="post-trip-confirm__text post-trip-confirm__text--header">Your trip has been posted
                                    <span><FontAwesomeIcon className="post-trip-confirm__text--icon" icon={faCheckCircle}></FontAwesomeIcon></span>
                                </p>
                                <p className="post-trip-confirm__text post-trip-confirm__text--caption">We'll notify you when someone books your trip</p>
                                <div className="post-trip-confirm center-illustration">
                                    <img src={world} alt="" className="post-trip-confirm center-illustration center-image"/>
                                </div>
                                <Grid container spacing={1} className="post-trip-confirm__btnSet">
                                    <Grid item xs={5}>
                                        <a to="/postTrip">
                                            <div className="post-trip-confirm__btnSet__btn post-trip-confirm__btnSet__btn--postNew">
                                                <span className="">Post new trip</span>
                                            </div>
                                        </a>
                                    </Grid>
                                    <Grid item>
                                        <a href="/">
                                            <div className="post-trip-confirm__btnSet__btn post-trip-confirm__btnSet__btn--home">
                                                <span>Back to home</span>
                                            </div>
                                        </a>
                                    </Grid>
                                </Grid>
                            </div> 
                             : "" }
                        </div>
                    </div>
                    {/* A bunch of error alerts */}
                    {/* Empty Input Error */}
                    <Snackbar open={errorEmpty}
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
                    {/* Firebase Connection/Wifi Error */}
                    <Snackbar open={isSubmitted === "submit-error"}
                              autoHideDuration={6000}
                              onClose={handleClose}
                              anchorOrigin={{
                                  vertical: 'top',
                                  horizontal: 'center',
                              }}>
                        <ThemeProvider theme={defaultMaterialTheme}>
                            <Alert onClose={handleClose} severity="error">
                                Error posting trip! Try again.
                            </Alert>
                        </ThemeProvider>
                    </Snackbar>
                    {/* Invalid Date/Time Format Error */}
                    <Snackbar open={errorTime}
                              autoHideDuration={6000}
                              onClose={handleClose}
                              anchorOrigin={{
                                  vertical: 'top',
                                  horizontal: 'center',
                              }}>
                        <ThemeProvider theme={defaultMaterialTheme}>
                            <Alert onClose={handleClose} severity="error">
                                Please enter a valid date/time
                            </Alert>
                        </ThemeProvider>
                    </Snackbar>
                </div>
            </header>
        </CssBaseline>
    );
}