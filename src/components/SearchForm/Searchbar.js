import React, { Component, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';

import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

export default function Searchbar() {
    const classes = useStyles();
    const [selectedDate, handleDateChange] = useState(new Date());
    const [pickupval, setPickup] = useState('');
    const [destinationval, setDestination] = useState('');

    const labelRef = React.useRef(null);

    // function handleChange (e) {
    //     const value = e.target.value;
    //     setState({
    //         ...state,
    //         [e.target.name]: value
    //     });
    // }
    // const handleChange = (e) => {
    //     setState({
    //         ...state,
    //         [e.target.name]: e.target.value
    //     });
    // }
    const handlePickupChange = e => {
        setPickup(e.target.value);
    }

    const handleDestinationChange = e => {
        setDestination(e.target.value);
    }
    return(
        <form className={classes.form} noValidate>
            <FormControl className={classes.FormControl} variant="outlined">
                <InputLabel ref={labelRef} htmlFor="component-outlined">
                    pickup
                </InputLabel>
            <OutlinedInput
                type='text'
                value={pickupval}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="pickup"
                onChange={handlePickupChange}
                name="pickup"
                autoFocus
            />
            </FormControl>
            <FormControl className={classes.FormControl} variant="outlined">
            <InputLabel ref={labelRef} htmlFor="component-outlined">
                    destination
                </InputLabel>
            <OutlinedInput
                type='text'
                value={destinationval}
                margin="normal"
                required
                fullWidth
                id="destination"
                onChange={handleDestinationChange}
                name="destination"
                autoFocus
            />
            </FormControl>
            <DatePicker
                    placeholderText="choose date and time"
                    selected={selectedDate}
                    onChange={handleDateChange}
                    showTimeSelect
                    drop
                    dateFormat="Pp"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                submit
            </Button>
        </form>
    )
};
