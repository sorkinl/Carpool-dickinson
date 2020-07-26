import React from 'react';
import './PostRideField.css';
import { makeStyles } from '@material-ui/core/styles';
import {
    Snackbar,
    TextareaAutosize,
    Paper,
    Container,
    Box,
    TextField,
    Grid,
    CssBaseline,
    Typography,
    Button,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import { useSelector } from "react-redux";
import { useFirestore } from 'react-redux-firebase';
import ConfirmField from "./ConfirmField";
import firebase from "../../firebase/firebaseConfig";
import AutoOrigin from "./AutoOrigin";
import AutoDestination from './AutoDestination';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        padding: theme.spacing(4),
    },
    paper: {
        marginTop: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(4),
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(4),
    },
    title: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        paddingLeft: theme.spacing(4),
    },
    submit: {
        margin: theme.spacing(3, 3, 2),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "45ch",
    },
    timeField: {
        marginLeft: theme.spacing(0),
        marginRight: theme.spacing(3),
        width: "30ch",
    },
}))
//Get current date
/* const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);
const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(); */

export default function PostRideField() {
    const classes = useStyles();
    const user = useSelector(state => state.firebase.profile);
    const [error, setError] = React.useState(false);
    const [dateError, setDateError] = React.useState(false);
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

    

    const [load, setLoad] = React.useState('default');
    const timerRef = React.useRef();

    const [submit, setSubmit] = React.useState(false);
    const firestore = useFirestore();

    function handleChange(e) {
        const { name, value } = e.target;
        setState((state) => ({ ...state, [name]: value }));
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
    function handleDateChange(date) {
        /* if(validateDate(date) === false){
            setState({ ...state, departDate: date });
            setDateError(false);
        }
        else {
            setDateError(true);
        } */
        date.setUTCHours(0,0,0,0);
        console.log(date)
        setState({...state, departDate: date})
    }
    console.log(date)
    function handleClose() {
        setDateError(false);
        setError(false);
    };
    function checkEmptyInput() {
        if(state.originTitle === ""
            || state.destTitle === ""
            || state.departTime === ""
            || state.emptySeat === "") {
            return false;
        } else{
            return true;
        }
    }
    /* function validateDate(date) {
        if (date < yesterday){
            return true;
        }
        else {
            return false;
        }
    } */
    function handleLoad() {
        clearTimeout(timerRef.current);
        setLoad('progress');
        timerRef.current = setTimeout(() => {
            setLoad('success');
        }, 2500);
    }
    const submitTrip = async () => {
        try {
            await firestore.collection("trips").add({...state});
        }
        catch (error) {
            console.log("Create Trip error", error);
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(dateError === true){
        }
        else if(checkEmptyInput() === false) {
            setError(true);
            console.log({...state});
        }
        else {
            //query user's data
            state.uid = firebase.auth().currentUser.uid;
            state.firstName = user.firstName;
            state.lastName = user.lastName;
            state.photoUrl = user.photoUrl;
            console.log({...state});
            submitTrip();
            handleLoad();
            setSubmit(true);
        }
    };

    return (
        <div className={classes.root} id="main">
            { submit === false ?
                <div>
                    <Container maxWidth="md">
                        <CssBaseline />
                        <Paper className={classes.paper} elevation={3}>
                            <Typography variant="h5" align="left" className={classes.title}>
                                Offer a ride
                            </Typography>

                            <div className="line2"></div>

                            {/* main form */}
                            <form className={classes.form}>
                                <Grid container spacing={2}>

                                    <Grid item xs={12} sm={6}>
                                        <AutoOrigin onSuggestionSelect={handleLocationChange}/>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                       <AutoDestination onSuggestionSelect={handleLocationChange}/>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={5}>

                                        <Typography variant="h6" align='left' className={classes.title} >
                                            Ride schedule
                                        </Typography>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                disableToolbar
                                                required
                                                variant="inline"
                                                format="MM/dd/yyyy"
                                                margin="normal"
                                                label="Date"
                                                name="departDate"
                                                minDate={new Date()}
                                                value={state.departDate}
                                                onChange={handleDateChange}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            className={classes.timeField}
                                            required
                                            fullWidth
                                            label="Pickup time"
                                            name="departTime"
                                            value={state.departTime}
                                            inputProps={{
                                                maxLength: 18,
                                            }}
                                            placeholder="eg: 8am/9:30am-2pm/Anytime"
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={3}>
                                        <Typography variant="h6" align='left' className={classes.title} >
                                            Empty seats*
                                        </Typography>
                                        <FormControl>
                                            <RadioGroup name="emptySeat" value={state.emptySeat} onChange={handleChange}>
                                                <FormControlLabel value="1" control={<Radio />} label="1" />
                                                <FormControlLabel value="2" control={<Radio />} label="2" />
                                                <FormControlLabel value="3" control={<Radio />} label="3" />
                                                <FormControlLabel value="4" control={<Radio />} label="4" />
                                                <FormControlLabel value="5" control={<Radio />} label="5" />
                                                <FormControlLabel value="6" control={<Radio />} label="6" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant="h6" align='left' className={classes.title} >
                                            Trip description (optional)
                                        </Typography>
                                        <TextareaAutosize rowsMin={6}
                                                          rowsMax={8}
                                                          placeholder="Add description"
                                                          name="description"
                                                          onChange={handleChange}
                                                          value={state.description}
                                        />
                                    </Grid>
                                </Grid>
                            </form>
                        </Paper>
                        <Box mt={2}></Box>
                        <Button onClick={handleSubmit}
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                        >
                            Post ride
                        </Button>
                    </Container>
                    <Snackbar open={dateError}
                              autoHideDuration={6000}
                              // onClose={handleClose}
                              anchorOrigin={{
                                  vertical: 'top',
                                  horizontal: 'center',
                              }}>
                        <Alert severity="error">
                            Date must not be in the past
                        </Alert>
                    </Snackbar>
                    <Snackbar open={error}
                              autoHideDuration={6000}
                              onClose={handleClose}
                              anchorOrigin={{
                                  vertical: 'top',
                                  horizontal: 'center',
                              }}>
                        <Alert onClose={handleClose} severity="error">
                            Required fields missing!
                        </Alert>
                    </Snackbar>
                </div>
                :
                <ConfirmField load={load}></ConfirmField>}
        </div>
    );
}