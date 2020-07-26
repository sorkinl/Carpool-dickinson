import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import "./SearchResultBoxForm.scss"
import {Button,FormControl,InputLabel,OutlinedInput} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { Link, useRouteMatch, Switch, Route} from 'react-router-dom';
import { createTrip, getTrips } from '../../redux/actions/tripsActions';
import {MuiPickersUtilsProvider, DatePicker} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import SearchResult from "./SearchResult"

const useStyles = makeStyles((theme) => ({
    muiPicker:{

    },
    datePicker: {
        
        // backgroundColor:"red",
        width:"100%",
        height:"100%",
        margin:0, 
        // borderWidth:"3px"
        // textAlign:"center",
        justifyContent:"center",
        left:"2.5em"
        
    },
    button:{
        backgroundColor:"#FAD40F",
    }
}))
const SearchResultBox = ()=>{

    const classes = useStyles();

    let match = useRouteMatch();

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
        console.log(searchInput)
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
        <form noValidate>
            <div id ='SearchResultBoxForm'> 
                <div id = "SearchResultBoxForm__destination" className = "SearchResultBoxForm__element">
                    <FormControl  id = "destination__formControl" variant="outlined">
                        <InputLabel htmlFor="component-outlined">
                                Destination?
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
                </div>
                <div id ="SearchResultBoxForm__pickup__date" className = "SearchResultBoxForm__element">
                    <div id = "pickup">
                        <FormControl  variant="outlined" id = "pickupForm">
                            <InputLabel htmlFor="component-outlined">
                                Pickup?
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
                    </div>
                    <div id = "date">
                        <MuiPickersUtilsProvider utils={DateFnsUtils} className = {classes.muiPicker}>
                            <DatePicker
                                className = {classes.datePicker}
                                disableToolbar
                                variant="inline"
                                autoOk
                                emptyLabel = "Date"
                                format="MM/dd/yyyy"
                                name="departDate"
                                value={searchInput.departDate}
                                onChange={handleDateChange}
                                minDate = {new Date().setHours(0,0,0,0)}
                                InputProps={{
                                    disableUnderline: true,
                                   }}
                    
                                
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                </div>
                <div id = "SearchResultBoxForm__searchButton" className = "SearchResultBoxForm__element">
                    {/* <Link to={`${match.url}/results/?originTitle=${searchInput.originTitle}&destTitle=${searchInput.destTitle}`} onClick = {handleSubmit}> */}
                        <Link to={`searchResult`} onClick = {handleSubmit}> 
                        <Button
                            className = {classes.button}
                            type="submit"
                            fullWidth
                            variant="contained"
                            // onClick={handleSubmit}
                
                        >   
                            Get Started!
                        </Button>
                     </Link>
                    <Switch>
                        <Route path={`searchResult`} render = {(props) =>(
                            <SearchResult {...props}/>
                        )}
                        />
                
                    </Switch>
                </div>
            </div>
        </form>
    )

    
}

export default SearchResultBox;