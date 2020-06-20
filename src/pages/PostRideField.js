import React, {useState} from 'react';
import './PostRideField.css';
import { makeStyles } from '@material-ui/core/styles';
import {TextareaAutosize, Paper, Container, Box, TextField, Grid, CssBaseline, Typography, Button, Radio, RadioGroup, FormControlLabel, FormControl, InputAdornment} from '@material-ui/core';
import {StepLabel, Step, Stepper } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import EditIcon from '@material-ui/icons/Edit';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';
import {useDispatch, useSelector} from "react-redux";
import { useFirestoreConnect } from 'react-redux-firebase';
import {createTrip} from "../redux/actions/tripsActions";
import {autoSuggest} from "../redux/actions/tripsActions";

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
        marginBottom: theme.spacing(1),
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
        marginTop: theme.spacing(1),
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
    originTitle: "",
    destTitle:"",
    departDate: date,
    departTime: "",
    numSeat: "",
    comment: "",
    firstName: "",
    lastName: "",
}

function ContactField() {
    const classes = useStyles();
    useFirestoreConnect([
        { collection: 'users' }
    ])
    const user = useSelector(state => state.firebase.profile);
    makeTrip.firstName = user.firstName;
    makeTrip.lastName = user.lastName;

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
                                as it will be seen by your passengers.
                            </Box>
                        </Typography>
                        <Button href="../Account/Profile/Profile.jsx" size="small" color="primary"  variant="contained" endIcon={<EditIcon />} className={classes.editButton}>
                            Edit profile
                        </Button>
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
                                    fullWidth
                                    placeholder="From"
                                    // label="First name"
                                    value={makeTrip.firstName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant='filled'
                                    disabled
                                    size='small'
                                    className={classes.profileField}
                                    fullWidth
                                    // label="Last name"
                                    placeholder="To"
                                    value={makeTrip.lastName}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    variant='filled'
                                    disabled
                                    size='small'
                                    className={classes.profileField}
                                    fullWidth
                                    value={user.classYear}
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
                                    // label="Email"
                                    fullWidth
                                    value={user.email}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant='filled'
                                    disabled
                                    size='small'
                                    className={classes.profileField}
                                    fullWidth
                                    value={user.phone}
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

function RideField() {

    const classes = useStyles();
    const [state, setState] = useState(makeTrip);

    function handleChange(e) {
        const {name, value} = e.target;
        setState((state) => ({...state, [name]: value}));
        makeTrip[name] = value;
    }

    function handleDateChange(date) {
        setState({ ...state, departDate: date });
    };

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
                                    Empty seats
                                </Typography>
                                <FormControl>
                                    {/*<FormLabel component="legend">Number of seats</FormLabel>*/}
                                    <RadioGroup name="numSeat" value={state.numSeat} onChange={handleChange}>
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
                                    Trip description
                                </Typography>
                                <TextareaAutosize rowsMin={6}
                                                  rowsMax={8}
                                                  placeholder="Add description"
                                                  name="comment"
                                                  onChange={handleChange}
                                                  value={state.comment}
                                />
                            </Grid>
                        </Grid>

                    </form>
                    <Box mt={5}></Box>
                </Paper>

            </Container>
        </div>
    );
}

function ConfirmField() {
    const classes = useStyles();
    return (
        <div>
            <Container component="secondStep" maxWidth="md">
                <CssBaseline/>
                <Paper className={classes.paper} elevation={3}>
                    <Typography variant="h5"  className={classes.title} color="primary">
                        Woohoo! All steps completed <DoneOutlineIcon style={{ color: green[500] }}/>
                    </Typography>
                    <Typography variant="body2" className={classes.caption} color='textSecondary'>
                        <Box fontStyle="italic">
                            A ride confirmation page has been sent to your email.
                        </Box>
                    </Typography>
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
            return <ConfirmField></ConfirmField>
        default:
            return 'Unknown step';
    }
}

export default function PostRideField() {

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    // const [isHome, setHome] = React.useState(false);
    const steps = getSteps();
    const dispatch = useDispatch();

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

        //e.preventDefault();
        console.log(makeTrip);
        dispatch(createTrip(makeTrip));
        //setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
                {activeStep === 2 ? (

                    <div>
                       <ConfirmField></ConfirmField>
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
                                // href="../App.js"
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
                            {activeStep === steps.length - 2 ? <Button variant="contained" color="primary" onClick={handleSubmit} className={classes.submit}>
                                Post ride
                            </Button>
                                : <Button variant="contained" color="primary" onClick={handleNext} className={classes.submit}>
                                Next
                            </Button>}

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
