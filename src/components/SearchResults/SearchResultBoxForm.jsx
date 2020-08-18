import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import "./SearchResultBoxForm.scss"
import {Button,FormControl,InputLabel,OutlinedInput} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { Link, useRouteMatch, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { getTripByRadius, searchProps } from '../../redux/actions/tripsActions';
import {MuiPickersUtilsProvider, DatePicker} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import SearchResult from "./SearchResult"
import AutoOrigin from "../CreateTrip/AutoOrigin"
import AutoDestination from "../CreateTrip/AutoDestination"

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
        originCoord: {lat:'', long:''},
        destTitle:'',
        destCoord: {lat:'', long:''},
        departDate: new Date()
    })
    const dispatch = useDispatch();

    // change the state when the search input is typed
    const handleChange = (value, name) => {
        if(name === "origin"){
            setSearchInput({...searchInput, originTitle: value.label})
        } else {
            console.log(value)
            setSearchInput({...searchInput, destTitle: value.label, destCoord: {lat: value.lat, long:value.lng}})
        }
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
        console.log(searchInput)
        console.log("submitted")
     
        dispatch(getTripByRadius(searchInput))
        dispatch(searchProps(searchInput))
    }
    return(
        <form noValidate>
            <div id ='SearchResultBoxForm'> 
                <div id = "SearchResultBoxForm__destination" className = "SearchResultBoxForm__element">
                   
                    <AutoDestination onSuggestionSelect={handleChange}/>
                    
                </div>
                <div id ="SearchResultBoxForm__pickup__date" className = "SearchResultBoxForm__element">
                    <div id = "pickup">
                       
                        <AutoOrigin onSuggestionSelect={handleChange}/>

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
                        <Link to="/searchResult" 
                        onClick = {handleSubmit}> 
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
                            <Route exact path="/searchResult"
                            render = {(props) =>(
                                <SearchResult {...props}  {...searchInput}/>
                            )}
                            // component={() => <SearchResult title={true} />}
                            />
                        
                    
                        </Switch>
          
                </div>
            </div>
        </form>
    )

    
}

export default SearchResultBox;