import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useFirestore, useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function EditForm(props){
    //get tripId from path
    const firestore = useFirestore();
    const tripId = props.match.params.tripId;
    const dispatch = useDispatch();
    const [isUpdated, setUpdate] = useState(false);
    const classes = useStyles();

    useFirestoreConnect([
        { collection: 'trips' }
    ]);

     //having trouble with iterating this array of object
     const dataToEdit = useSelector((state) => state.firestore.data.userTrips);
     const tripToEdit = useSelector((state) => state.firestore.data.trips);
     const [state, setState] = useState({
        originTitle: '',
        destTitle: '',
        departDate: new Date(),
        departTime: '',
    });


    
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    const handleDateChange = date => {
        setState({...state,
            departDate: date
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(state.departTime);
        const modifiedTrip = {
            originTitle: state.originTitle,
            destTitle: state.destTitle,
            destination: {
                latitude: 23,
                longitude: 52} ,
            departTime: state.departTime,
            departDate: state.departDate.toDateString(),
        }
        setUpdate(true);
        firestore.update({
            collection: 'trips',
            doc: tripId,
        }, modifiedTrip);
    };

    return isLoaded(dataToEdit) && !isEmpty(dataToEdit) ? (
        <div className="container">
        <form className="submit-btn">
            <FormControl className={classes.FormControl} variant="outlined">
                <InputLabel htmlFor="component-outlined">
                    previous: { tripToEdit[tripId].originTitle }
                </InputLabel>
                <OutlinedInput
                type='text'
                placeholder="pickup"
                value={state.originTitle}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="originTitle"
                onChange={handleChange}
                name="originTitle"
                />
            </FormControl>
            <FormControl className={classes.FormControl} variant="outlined">
                <InputLabel htmlFor="component-outlined">
                    previous: { tripToEdit[tripId].destTitle }
                </InputLabel>
                <OutlinedInput
                    type='text'
                    value={state.destTitle}
                    margin="normal"
                    placeholder="destination"
                    required
                    fullWidth
                    id="destTitle"
                    onChange={handleChange}
                    name="destTitle"
                />
            </FormControl>
            <FormControl className={classes.FormControl} variant="outlined">
                <InputLabel htmlFor="component-outlined">
                    previous: { tripToEdit[tripId].departTime }
                </InputLabel>
                <OutlinedInput
                    type='text'
                    value={state.departTime}
                    margin="normal"
                    placeholder="choose time"
                    required
                    fullWidth
                    id="departTime"
                    onChange={handleChange}
                    name="departTime"
                />
            </FormControl>
            <DatePicker
                placeholderText="choose date"
                selected={state.departDate}
                onChange={handleDateChange}
                />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
            >
                Edit
            </Button>
        </form>
    </div>
    ) : (
        <div>
        <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        Cannot find requested trip — <strong><a href='/account'>Click here to check your trip again!</a></strong>
      </Alert>
      </div>
      ) 
};