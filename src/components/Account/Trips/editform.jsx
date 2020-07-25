import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import { useSelector } from 'react-redux';
import { Button, Dialog, TextField, Input } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useFirestore, useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import Autocomplete from '../../Autocomplete';
import Popup from "reactjs-popup";
import svg from "../../../assets/images/travel_pic.svg";

//import "./editform.css"



// const useStyles = makeStyles((theme) => ({
//     root: {
//         '& .MuiTextField-root': {
//             margin: theme.spacing(1),
//             width: '25ch',
//         },
//     },
//     form: {
//         padding: "15px",
//         display: "flex",
//         flexDirection: "column",
//     },
//     fields: {
//         marginBottom: theme.spacing(2),
//         borderStyle: "1px solid",

//     },
//     button: {
//        // marginBottom: theme.spacing(1),

//     },
//     title: {
//        margin: theme.spacing(0),
//     },
//     date: {
//         boarderColor: "#92a8d1",
//     }
// }));

export default function EditForm(props){
    //get tripId from path
    const firestore = useFirestore();
    const tripId = props.tripId;
    const trip = props.trip;
    
    const [isUpdated, setUpdate] = useState(false);
    //const classes = useStyles();

    //connect to firebase with redux
    useFirestoreConnect([
        { collection: 'trips' }
    ]);

     /**
      * dataToEdit is used when there is no data loaded from redux; this is used when the user tries to access to edit form directly using tripId
      * tripToEdit is used when the user access to editform via buttons (step by step)
      */
     const dataToEdit = useSelector((state) => state.firestore.data.userTrips);
     const tripToEdit = useSelector((state) => state.firestore.data.trips);
     const [state, setState] = useState({
        originTitle: trip.originTitle,
        destTitle: trip.destTitle,
        departDate: new Date(),
        departTime: trip.departTime,
    });

    var date = new Date();
    date.setUTCHours(0,0,0,0);


    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    const handleDateChange = date => {
        date.setUTCHours(0,0,0,0);
        console.log(date)
        setState({...state, departDate: date})
    };

//      //useState for controlling popup
//   const [openPopup, setOpenPopup] = React.useState(false);
//   const handleClickOpen = () => {
//     setOpenPopup(true);
//   };
//   const handleClosePopup = () => {
//     setOpenPopup(false);
//   };

  const closePopup = () => {
      props.closePopup();
  };

  function handleDelete(e) {
      props.handleDelete();
  };

  const [openDelete, setOpenDelete] = React.useState(false);
  const openDeletePopup = () => {
      setOpenDelete(true);
  };

  const closeDeletePopup = () => {
      setOpenDelete(false);
  };
  


    //change departDate field from Date to string when storing in firebase
    //handleSubmit function updates the information to firebase
    const handleSubmit = (e) => {
        e.preventDefault();
        const modifiedTrip = {
            originTitle: state.originTitle,
            destTitle: state.destTitle,
            destination: {
                latitude: 23,
                longitude: 52} ,
            departTime: state.departTime,
            departDate: state.departDate,
        }
        setUpdate(true);
        firestore.update({
            collection: 'trips',
            doc: tripId,
        }, modifiedTrip);
        closePopup();
    };
    console.log(props)

    //when the dataToEdit is not empty it opens an edit
    return isLoaded(dataToEdit) && !isEmpty(dataToEdit) ? (
        <div className="edit-popup container">
            <span className="edit-popup title" >
            MODIFY THIS TRIP 
            </span>
            <div>
        <InputLabel> Origin </InputLabel> 
        </div><div className="edit-popup fields">
            <FormControl variant="outlined">
                <Input 
                // type="outlined-textarea"
                value={state.originTitle}
                margin="normal"
                required
                disableUnderline
                fullWidth
                id="originTitle"
                onChange={handleChange}
                name="originTitle"
                label="Origin"
                />
            </FormControl>
            </div>
            <InputLabel>Destination </InputLabel>
            <div className="edit-popup fields">
            <FormControl variant="outlined">
                <Input
                    type='text'
                    value={state.destTitle}
                    margin="normal"
                    required
                    disableUnderline
                    fullWidth
                    id="destTitle"
                    onChange={handleChange}
                    name="destTitle"
                />
            </FormControl>
            </div>
            <InputLabel  >Departure time</InputLabel>
            <div className="edit-popup fields">
            <FormControl variant="outlined">
                <Input
                    id="outlined-basic"
                    type='text'
                    value={state.departTime}
                    margin="normal"
                    placeholder="choose time"
                    required
                    disableUnderline
                    fullWidth
                    id="departTime"
                    onChange={handleChange}
                    name="departTime"
                />
            </FormControl>
            </div>
            <InputLabel>Date</InputLabel>
            <div className="edit-popup fields">
             <DatePicker 
                className="datePicker"
                required
                placeholderText="choose date"
                selected={state.departDate}
                onChange={handleDateChange}
                popperPlacement="top"
                />  
                </div>
    
            <a
                className="btn btn--purple"
                onClick={handleSubmit}>
        
                EDIT
            </a>
            <a
                className='btn btn--deleteTrip'
                onClick={openDeletePopup}
                >
                    DELETE TRIP
            </a>
                <Popup
                    contentStyle={{width: "25rem"}}
                    open={openDelete}
                    onClose={closeDeletePopup}
                    >
                    <div className="edit-popup deleteContainer">
                    <span className="edit-popup deleteQuestion"> Are you sure you you want to delete this trip?</span>
                    <div>
                    <img src={svg} alt="" className="edit-popup image"></img>
                    </div> 
                    <button className='btn btn--purple' onClick={closeDeletePopup}> Cancel</button>
                    <button className='btn btn--deleteTrip' onClick={handleDelete} > Delete</button>
                    </div>
                </Popup>
            {/* <Autocomplete/>  */}
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