import React, {useState, useEffect} from 'react';
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
    InputAdornment
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import {useDispatch, useSelector} from "react-redux";
import { useFirestore } from 'react-redux-firebase';
import ConfirmField from "./ConfirmField";
import axios from "axios";
import firebase from "../../firebase/firebaseConfig";
import {useFirestoreConnect} from "react-redux-firebase";
import {MAKE_TRIP} from "../../redux/constants/trip-types";

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
}));
//Get current date
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

//Global trip variable
let makeTrip = {
    originTitle: "",
    destTitle: "",
    departDate: date,
    departTime: "",
    emptySeat: "",
    description: "",
    firstName: "",
    lastName: "",
    photoUrl: "",
};
let tripToAdd = {};

export const createTrip = async (payload) => {
    try {
        const originSearch = encodeURIComponent(payload.originTitle);
        const destSearch = encodeURIComponent(payload.destTitle);
        const originRes = await axios
            .get(
            `https://geocode.search.hereapi.com/v1/geocode?q=${originSearch}&apiKey=${process.env.REACT_APP_HERE_KEY}`)
            .catch((e)=>{console.log(e, " at originRes")});
        const destRes = await axios.get(
            `https://geocode.search.hereapi.com/v1/geocode?q=${destSearch}&apiKey=${process.env.REACT_APP_HERE_KEY}`)
            .catch((e)=>{console.log(e, " at destRes")});

        tripToAdd = {
            uid: firebase.auth().currentUser.uid,
            user: {
                firstName: payload.firstName,
                lastName: payload.lastName,
                // photoUrl: payload.photoUrl,
            },
            originTitle: originRes.data.items[0].title,
            origin: {
                latitude: originRes.data.items[0].position.lat,
                longitude: originRes.data.items[0].position.lng
            },
            destTitle: destRes.data.items[0].title,
            destination: {
                latitude: destRes.data.items[0].position.lat,
                longitude: destRes.data.items[0].position.lng
            },
            departDate: payload.departDate,
            departTime: payload.departTime,
            description: payload.description,
            emptySeat: payload.emptySeat,
        }
        console.log(tripToAdd);
    } catch (error) {
        console.log("Create Trip error", error);
    }
}

export default function PostRideField() {
    const classes = useStyles();
    const [error, setError] = React.useState(false);
    const [state, setState] = useState(makeTrip);

    const [load, setLoad] = React.useState('default');
    const timerRef = React.useRef();

    const [submit, setSubmit] = React.useState(false);
    const firestore = useFirestore();

    useFirestoreConnect([{ collection: 'users' }])
    const user = useSelector(state => state.firebase.profile);

    function handleChange(e) {
        const { name, value } = e.target;
        setState((state) => ({ ...state, [name]: value }));
        makeTrip[name] = value;
    }
    function handleDateChange(date) {
        setState({ ...state, departDate: date });
        makeTrip["departDate"] = date;
    }
    function handleClose() {
        setError(false);
    };
    function validateInput() {
        if(makeTrip.originTitle === ""
            || makeTrip.destTitle === ""
            || makeTrip.departDate === ""
            || makeTrip.departTime === ""
            || makeTrip.emptySeat === "") {
            return false;
        } else{
            return true;
        }
    }
    function handleLoad() {
        clearTimeout(timerRef.current);
        setLoad('progress');
        timerRef.current = setTimeout(() => {
            setLoad('success');
        }, 2500);
    }

    const submitTrip = async () => {
        await createTrip(makeTrip);
        await firestore.collection("trips").add(tripToAdd);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(validateInput() === false) {
            setError(true);
        } else {
            //createTrip
            makeTrip.firstName = user.firstName;
            makeTrip.lastName = user.lastName;
            makeTrip.photoUrl = user.photoUrl;
            // submitTrip().then(handleLoad);
            submitTrip().then();
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
                                        <TextField
                                            className={classes.textField}
                                            name="originTitle"
                                            required
                                            fullWidth
                                            variant="filled"
                                            placeholder="From"
                                            label="Origin"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <LocationOnIcon color="primary"/>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            value={state.originTitle}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            className={classes.textField}
                                            required
                                            variant="filled"
                                            fullWidth
                                            label="Destination"
                                            name="destTitle"
                                            placeholder="To"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <LocationOnIcon color="secondary"/>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            value={state.destTitle}
                                            onChange={handleChange}
                                        />
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
                                                value={state.departDate}
                                                onChange={handleDateChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
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
                                            {/*<FormLabel component="legend">Number of seats</FormLabel>*/}
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