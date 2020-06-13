import React, {useState} from 'react';
import './PostRideField.css';
import { makeStyles } from '@material-ui/core/styles';
import Link from "@material-ui/core/Link";
import {Paper, Container, Box, TextField, Grid, CssBaseline, Typography, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel} from '@material-ui/core';
import {StepLabel, Step, Stepper } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';
import {useDispatch} from "react-redux";

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
        marginTop: theme.spacing(1.5),
        paddingLeft: theme.spacing(4)
    },
    submit: {
        margin: theme.spacing(3, 3, 2),
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
}));


function getSteps() {
    return ['YOUR RIDE DETAILS', 'CONTACT INFORMATION', 'CONFIRM RIDE'];
}

function AddressField() {

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    // var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    // var dateTime = date+' '+time;

    const classes = useStyles();

    const [state, setState] = useState({
        departure:"",
        destination:"",
        pickupDate: date,
        pickupTime: "",
        numSeat: ""
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setState((state) => ({ ...state, [name]: value }));
    }
    return (
        <div >
             <Container component="main" maxWidth="md">
                <CssBaseline/>

                 <Paper className={classes.paper} elevation={3}>

                    <Typography variant="h5" align='left' className={classes.title} >
                        Offer a ride
                    </Typography>

                    <div className="line"></div>

                    {/* main form */}
                    <form className={classes.form} /*onSubmit={}*/>
                        <Grid container spacing={2}>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant='filled'
                                    className={classes.textField}
                                    autoComplete="depart"
                                    name="departure"
                                    required
                                    fullWidth
                                    placeholder="From"
                                    label="Departure"
                                    autoFocus
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant='filled'
                                    className={classes.textField}
                                    required
                                    fullWidth
                                    label="Destination"
                                    name="destination"
                                    autoComplete="dest"
                                    placeholder="To"
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
                                    <RadioGroup name="numSeat" value={state.numSeat} onChange={handleChange}>
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

export function getStepContent(step) {
    switch (step) {
        case 0:
            return <AddressField></AddressField>;
        case 1:
            return 'What is an ad group anyways?';
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
                            <Button variant="contained" color="primary" onClick={handleNext} className={classes.submit}>
                                {activeStep === steps.length - 1 ? 'Confirm ride' : 'Next'}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
