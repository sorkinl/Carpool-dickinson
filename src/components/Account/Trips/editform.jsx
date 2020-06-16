import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import { useDispatch } from 'react-redux';
import { editTrip } from '../../../redux/actions/tripsActions';
import { Button } from '@material-ui/core';
import { useFirestore } from 'react-redux-firebase';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function EditForm(props){
    const userId = props.match.params.userId;
    const dispatch = useDispatch();
    const [isUpdated, setUpdate] = useState(false);
    const [state, setState] = useState({
        pickup: props.from,
        destination: props.to,
        startDate: props.startDate,
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

    const firestore = useFirestore();
    var trip = firestore.collection("trips").doc('NZ07glQhOvTZ9tkn7XZI');
    console.log(trip);
    const handleSubmit = (e) => {
        e.preventDefault();
        setUpdate(true);
        firestore.update({
            collection: 'trips',
            doc: userId,
        });
        // setState({
        //     pickup:props.trip.from,
        //     destination:props.trip.to,
        //     startDate: new Date()
        // })
    }

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