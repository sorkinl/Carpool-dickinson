import React, {useState} from 'react';
import './PostRideField.css';
import { makeStyles } from '@material-ui/core/styles';
import Link from "@material-ui/core/Link";
import { Paper, Container, Box, TextField, Grid, CssBaseline, Typography, Button, Radio, RadioGroup, FormControlLabel, FormControl, IconButton} from '@material-ui/core';
import {StepLabel, Step, Stepper } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';
import {useDispatch, useSelector} from "react-redux";
import { useFirestoreConnect } from 'react-redux-firebase';
import {BrowserRouter as Router} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
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
        paddingLeft: theme.spacing(4)
    },
    caption: {
        width: "100%", // Fix IE 11 issue.
        paddingLeft: theme.spacing(4),
    },
    title2: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(2),
        paddingLeft: theme.spacing(4)
    },
    submit: {
        margin: theme.spacing(3, 3, 2),
    },
    editButton: {
        width: 130, // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(35)
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '40ch',
    },
    timeField: {
        marginLeft: theme.spacing(0),
        marginRight: theme.spacing(3),
        width: '30ch',
    },
    profileField: {
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(2),
        width: '22ch',
    }
}));


function getSteps() {
    return ['CONTACT INFORMATION', 'YOUR RIDE DETAILS', 'CONFIRM RIDE'];
}
//Get current date
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

//Global trip variable for stepper
let makeTrip = {
    departure: "",
    destination:"",
    pickupDate: date,
    pickupTime: "",
    numSeat: ""
}

function RideField() {

    const classes = useStyles();
    const [state, setState] = useState(makeTrip);

    function handleChange(e) {
        const {name, value} = e.target;
        setState((state) => ({...state, [name]: value}));
        makeTrip[name] = value;
    }
    return (
        <div >
             <Container component="secondStep" maxWidth="md">
                <CssBaseline/>

                 <Paper className={classes.paper} elevation={3}>

                    <Typography variant="h5" align='left' className={classes.title} >
                        Offer a ride
                    </Typography>

                    <div className="line2"></div>

                    {/* main form */}
                    <form className={classes.form} /*onSubmit={}*/>
                        <Grid container spacing={2}>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    className={classes.textField}
                                    autoComplete="depart"
                                    name="departure"
                                    required
                                    size='small'
                                    fullWidth
                                    placeholder="From"
                                    label="Departure"
                                    autoFocus
                                    value={state.departure}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    className={classes.textField}
                                    required
                                    size='small'
                                    fullWidth
                                    label="Destination"
                                    name="destination"
                                    autoComplete="dest"
                                    placeholder="To"
                                    value={state.destination}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={5}>

                                <Typography variant="subtitle2" align='left' className={classes.title} >
                                        Travel time
                                </Typography>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        required
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        label="Date"
                                        name="pickupDate"
                                        value={state.pickupDate}
                                        onChange={handleChange}
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
                                    name="pickupTime"
                                    value={state.pickupTime}
                                    placeholder="eg: 8am/9:30am-2pm/Anytime"
                                    value={state.pickupTime}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={3}>
                                <Typography variant="subtitle2" align='left' className={classes.title} >
                                    Number of seats
                                </Typography>
                                <FormControl>
                                   {/*<FormLabel component="legend">Number of seats</FormLabel>*/}
                                    <RadioGroup name="numSeat" value={state.numSeat} onChange={handleChange} value={state.numSeat}>
                                        <FormControlLabel value="seat1" control={<Radio />} label="1" />
                                        <FormControlLabel value="seat2" control={<Radio />} label="2" />
                                        <FormControlLabel value="seat3" control={<Radio />} label="3" />
                                        <FormControlLabel value="seat4" control={<Radio />} label="4" />
                                        <FormControlLabel value="seat5" control={<Radio />} label="5" />
                                        <FormControlLabel value="seat6" control={<Radio />} label="6" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>

                    </form>
                    <Box mt={5}></Box>
                </Paper>

              </Container>
        </div>
    );
}

function ContactField() {
    const classes = useStyles();
    useFirestoreConnect([
        { collection: 'users' }
    ])

    const [state, setState] = useState("");
    const users = useSelector((state) => state.firestore.ordered.users);

    function handleChange(e) {
        const {name, value} = e.target;
        setState((state) => ({...state, [name]: value}));
        makeTrip[name] = value;
    }
    return (
        <div >
            <Container component="firstStep" maxWidth="sm">
                <CssBaseline/>
                <Paper className={classes.paper} elevation={3}>
                    <Typography variant="h5" align='left' className={classes.title} >
                        Your contact information
                    </Typography>
                    <div className="line1"></div>
                    <form className={classes.form}>

                        <Typography variant="body2" align='left' className={classes.caption} color='textSecondary'>
                            <Box fontStyle="italic">
                                *Please make sure the information below is correct before continuing, <br/>
                                as it will be seen by your ride requesters.
                            </Box>
                        </Typography>
                        {/*<IconButton color="primary" fontSize="small" >Edit info*/}
                        {/*    <EditIcon fontSize="small"></EditIcon>*/}
                        {/*</IconButton>*/}
                        <Button href="../Account/Profile/Profile.jsx" size="small" color="primary"  variant="contained" endIcon={<EditIcon />} className={classes.editButton}>
                            Edit profile
                        </Button>

                        {/*<div>*/}
                        {/*    <Router>*/}
                        {/*        <a >Edit profile </a><EditIcon />*/}
                        {/*    </Router>*/}
                        {/*</div>*/}

                        <Typography variant="subtitle2" align='left' className={classes.title} >
                            Profile information
                        </Typography>

                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={5}>
                                <TextField
                                    variant='filled'
                                    disabled
                                    size='small'
                                    className={classes.profileField}
                                    name="departure"
                                    fullWidth
                                    placeholder="From"
                                    label="First name"
                                    value={state.departure}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant='filled'
                                    disabled
                                    size='small'
                                    className={classes.profileField}
                                    fullWidth
                                    label="Last name"
                                    name="lastName"
                                    placeholder="To"
                                    value={state.destination}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    variant='filled'
                                    disabled
                                    size='small'
                                    className={classes.profileField}
                                    fullWidth
                                    label="Class year"
                                    name="classYear"
                                    value={state.destination}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Typography variant="subtitle2" align='left' className={classes.title2} >
                            Contact information
                        </Typography>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={5}>
                                <TextField
                                    variant='filled'
                                    disabled
                                    size='small'
                                    className={classes.profileField}
                                    label="Email"name="email"
                                    fullWidth
                                    value={state.departure}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant='filled'
                                    disabled
                                    size='small'
                                    className={classes.profileField}
                                    fullWidth
                                    label="Phone number"
                                    name="phoneNum"
                                    value={state.destination}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                    </form>
                    <Box mt={3}></Box>
                </Paper>

            </Container>
        </div>
    );
}

export function getStepContent(step) {
    switch (step) {
        case 0:
            return <ContactField></ContactField>;
        case 1:
            return <RideField></RideField>;
        case 2:
            return 'This is the bit I really care about!';
        default:
            return 'Unknown step';
    }
}

export default function PostRideField() {

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [isHome, setHome] = React.useState(false);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    const handleSubmit = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        //dispatch
    };

    return (
        <div className={classes.root} id="main">
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>All steps completed</Typography>
                        <Button
                            onClick={handleReset}
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                        >
                                Create another ride
                        </Button>
                        <Button onClick={handleReset}
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                        >
                            Back to home
                        </Button>
                    </div>
                ) : (
                    <div>
                        <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                        <div>
                            <Button
                                variant="contained"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className={classes.submit}
                            >
                                Back
                            </Button>
                            {activeStep === steps.length - 1 ? <Button variant="contained" color="primary" onClick={handleSubmit} className={classes.submit}>
                                Confirm ride
                            </Button>
                                :<Button variant="contained" color="primary" onClick={handleNext} className={classes.submit}>
                                Next
                            </Button>}

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
