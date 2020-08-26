import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { createTrip, getTrips } from '../../redux/actions/tripsActions';


import { Link, useRouteMatch, Switch, Route} from 'react-router-dom';
import SearchResult from './SearchResult';

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

 

const Searchbar = () => {

    let match = useRouteMatch();

    const classes = useStyles();
    const [searchInput, setSearchInput] = useState({
        originTitle:'',
        destTitle:'',
        departDate: new Date()
    })
    const dispatch = useDispatch();

    // change the state when the search input is typed
    const handleChange = (e) => {
        setSearchInput({
            ...searchInput,
            [e.target.name]: e.target.value
        });
    }

    //change the state when the date input is typed
    const handleDateChange = date => {
        setSearchInput({
            ...searchInput,
            departDate: date
        });
    }

    //handles submit feature when the event is called.
    //after the submission, the state is reset
    const handleSubmit = (e) => {
        // e.preventDefault();    
        // dispatch(createTrip({pickup:searchInput.pickup}))
            console.log("submitted")
     

        // onCreate({...searchInput, departDate: searchInput.departDate.toISOString()});
        dispatch(getTrips(searchInput))
        // setState({
        //     pickup:'',
        //     destination:'',
        //     startDate: new Date()
        // })
    }

    return(

        <form className={classes.form} noValidate>
            <FormControl className={classes.FormControl} variant="outlined">
                <InputLabel htmlFor="component-outlined">
                    pickup
                </InputLabel>
            <OutlinedInput
                type='text'
                value={searchInput.originTitle}
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
                    destination
                </InputLabel>
            <OutlinedInput
                type='text'
                value={searchInput.destTitle}
                margin="normal"
                required
                fullWidth
                id="destTitle"
                onChange={handleChange}
                name="destTitle"
            />
            </FormControl>
            <DatePicker
                    placeholderText="choose date and time"
                    selected={searchInput.departDate}
                    onChange={handleDateChange}
                    showTimeSelect
                    dateFormat="Pp"
            />

    {/* Moved */}

    <Link to={`${match.url}/results/?originTitle=${searchInput.originTitle}&destTitle=${searchInput.destTitle}`} onClick = {handleSubmit}>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    // onClick={handleSubmit}
                    className={classes.submit}
                >
                    submit
                </Button>
   
        </Link>
        <Switch>
            <Route path={`${match.path}/results`}>
                <SearchResult/>
            </Route>
        </Switch>

        </form>

    )
}

export default Searchbar;