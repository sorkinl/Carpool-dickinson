import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Searchbar extends Component {
    state = {
        pickup: '',
        destination: '',
        startDate: new Date()
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleDateChange = date => {
        this.setState({
            startDate: date
          });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onCreate(this.state);
        this.setState({
            pickup:'',
            destination:'',
            startDate: new Date()
        });
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <input
                    placeholder="pickup"
                    value={this.state.pickup}
                    onChange={this.handleChange}
                    name="pickup"
                />
                <input
                    placeholder="destination"
                    value={this.state.destination}
                    onChange={this.handleChange} 
                    name="destination"
                />
                <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleDateChange}
                    showTimeSelect
                    dateFormat="Pp"
                />
                <button type="submit">Search</button>
            </form>
        );
    }
}

export default Searchbar;