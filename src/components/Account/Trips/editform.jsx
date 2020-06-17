import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';

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

    // useFirestoreConnect([
    //     { collection: 'trips' }
    // ]);

    // //having trouble with iterating this array of object
    // const tripToEdit = useSelector((state) => state.firestore.data.userTrips[tripId]);
    // console.log(tripToEdit);
    
    const [state, setState] = useState({
        destTitle: '',
        destination: '',
        departTime: new Date(),
    });
    
    const classes = useStyles();

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
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const modifiedTrip = {
            destTitle: state.destination,
            destination: {
                latitude: 23,
                longitude: 52} ,
            departTime: state.startDate,
        }
        setUpdate(true);
        console.log(modifiedTrip);
        firestore.update({
            collection: 'trips',
            doc: tripId,
        }, modifiedTrip);
    };

    return (
        <div className="container">
            <form className="submit-btn">
                <FormControl className={classes.FormControl} variant="outlined">
                    <InputLabel htmlFor="component-outlined">
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
                    />
                </FormControl>
                <FormControl className={classes.FormControl} variant="outlined">
                    <InputLabel htmlFor="component-outlined">
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
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    //onClick={()=>{setUpdate(true)}}
                    onClick={handleSubmit}
                >
                    Edit
                </Button>
            </form>
        </div>

       

    )
};