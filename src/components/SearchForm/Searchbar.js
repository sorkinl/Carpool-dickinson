import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Here SearchBar would get its props. {onCreate} is same as taking only one value from the props.
//Can also be done with const Searchbar = (props) => , but then it would be props.onCreate later on 
const Searchbar = ({onCreate}) => {
    // Your state
    const [state, setState] = React.useState({
        pickup: '',
        destination: '',
        startDate: new Date()
    })
    // This is where the problem was. When managing state object {}, you need to a spread operator "..."
    // to define the state that you don't want to change. If you don't do it, some state will be undefined
    /* const handleChange = (e) => {
        setState({
            [e.target.name]: e.target.value
        });
    } */
    const handleChange = (e) => {
        setState({...state,
            [e.target.name]: e.target.value
        });
    }
    //notice the spread operator "..." here as well.
    const handleDateChange = date => {
        setState({...state,
            startDate: date
          });
    }
    //prop onCreate is called and passes in the state object.
    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate(state);
        setState({
            pickup:'',
            destination:'',
            startDate: new Date()
        });
    }

        return(
            <form >
                <input
                    placeholder="pickup"
                    value={state.pickup}
                    onChange={handleChange}
                    name="pickup"
                />
                <input
                    placeholder="destination"
                    value={state.destination}
                    onChange={handleChange} 
                    name="destination"
                />
                <DatePicker
                    selected={state.startDate}
                    onChange={handleDateChange}
                    showTimeSelect
                    dateFormat="Pp"
                />
                <button type="button" onClick={handleSubmit}>Search</button>
            </form>
        );
    }


export default Searchbar;