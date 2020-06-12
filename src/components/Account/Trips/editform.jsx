import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function editform(props){
    
    const [state, setState] = useState({
        pickup: props.pickup,
        destination: props.destination,
        startDate: props.startDate,
    })
    const classes = useStyles();

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="submit-btn">
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
            </form>
        </div>

       

    )
};