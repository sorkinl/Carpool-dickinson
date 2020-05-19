import React, { Component, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';

import Link from '@material-ui/core/Link';
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

const Searchbar = ({onCreate}) => {
    const classes = useStyles();
    const [state, setState] = Reac.useState({
        pickup:'',
        destination:'',
        startDate: new Date()
    })



    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    const handleDateChange = date => {
        setState({...state,
            startDate: date
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate(State);
        setState({
            pikcup:'',
            destination:'',
            startDate: new Date()
        })
    }
    return(
        <form className={classes.form} noValidate>
            <FormControl className={classes.FormControl} variant="outlined">
                <InputLabel ref={labelRef} htmlFor="component-outlined">
                    pickup
                </InputLabel>
            <OutlinedInput
                type='text'
                value={state.pickup}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="pickup"
                onChange={handleChange}
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
                value={state.destination}
                margin="normal"
                required
                fullWidth
                id="destination"
                onChange={handleChange}
                name="destination"
                autoFocus
            />
            </FormControl>
            <DatePicker
                    placeholderText="choose date and time"
                    selected={state.startDate}
                    onChange={handleDateChange}
                    showTimeSelect
                    dateFormat="Pp"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                className={classes.submit}
            >
                submit
            </Button>
        </form>
    )
};
