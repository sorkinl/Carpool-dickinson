import React, {useState} from 'react';
import './EditField.css';
import {makeStyles, Container, TextField, Button, Grid, CssBaseline, MenuItem} from '@material-ui/core';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import { useSelector, useDispatch } from 'react-redux';
import { saveUpdate } from '../../../redux/actions/profileActions';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '34ch',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  input: {
    display: 'none',
  },
  submit: {
    margin: theme.spacing(3,3, 2),
  },
}));
/* An object storing select options for location input*/
const locations = [
  { value: 'school', label: 'Dickinson College',},
  { value: 'town', label: 'Carlisle, PA',},
  { value: 'nyc', label: 'New York, NY',},
];

// An edit profile component
function EditField(props){
  const classes = useStyles();
  const[isUpdated, setUpdate]= useState(false);

  //Set multiple states of the profile object. Individual states can be called using input.stateName
  const [input, setInput] = useState(
    {firstName: 'Naruto', lastName: 'Le', email: 'naruto@gmail.com', location: 'Carlisle, PA', phoneNum: ''}
  );


  //-------- EXPERIMENTING REDUX START-------------------------------//
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(saveUpdate({input}));

  }
  //-------- EXPERIMENTING REDUX END -------------------------------//


  /* Change states using the extracted input values from TextField
        name = the attribute name of inputProps inside each TextField
        value = the input value of the TextField whose inputProps's attribute name matches name
  */
  const handleEdit = event => {
      const { name, value } = event.target;
      setInput({ [name]: value });
  };

  return(
  <Container component="main" maxWidth="sm">
    <CssBaseline>
    <div className={classes.paper}>
      <form className={classes.form} noValidate autoComplete="off">
        {/* A grid container storing each grid item as a textbox */}
        <Grid container spacing={3}>
            {/* Change profile photo button */}
            <Grid xs={12}>
              <input accept="image/*" className={classes.input} id="contained-button-file" multiple type="file" />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" color="primary" component="span" >
                    Change profile photo
                  </Button>
                </label>
            </Grid>
            {/* First name textbox:
               "defaultValue" displays the current state of firstName
               "inputProps" stores the attributes for later use with handleEdit*/}
            <Grid item xs={12} sm={6}>
                <TextField
                  required
                  label="First Name"
                  id="first"
                  placeholder='Your first name'
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="filled"
                  defaultValue={input.firstName}
                  inputProps={{
                    name: 'firstName',
                    id: 'user-first',
                  }}
                  onChange={handleEdit}
                />
            </Grid>
            {/* Last name textbox:
              "defaultValue" displays the current state of lastName
              "inputProps" stores the attributes for later use with handleEdit*/}
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    label="Last Name"
                    id="last"
                    placeholder='Your last name'
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="filled"
                    defaultValue={input.lastName}
                    inputProps={{
                      name: 'lastName',
                      id: 'user-last',
                    }}
                    onChange={handleEdit}
                  />
            </Grid>
            {/* Email textbox:
              "defaultValue" displays the current state of email
              "inputProps" stores the attributes for later use with handleEdit*/}
            <Grid item xs={12}>
                <TextField
                  required
                  id="email"
                  label="Email"
                  style={{ margin: 4 }}
                  placeholder="Your email"
                  helperText="Please enter your email"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="filled"
                  defaultValue={input.email}
                  inputProps={{
                    name: 'email',
                    id: 'user-name',
                  }}
                  onChange={handleEdit}
                />
            </Grid>
            {/* Phone number textbox:
              "defaultValue" displays the current state of phone number
              "inputProps" stores the attributes for later use with handleEdit*/}
            <Grid item xs={12}>
              <TextField
                id="phoneNum"
                label="Phone Number"
                style={{ margin: 4 }}
                fullWidth
                placeholder="(123)-456-789"
                helperText="Please enter your phone number"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
                defaultValue={input.phoneNum}
                inputProps={{
                  name: 'phoneNum',
                  id: 'user-phoneNum',
                }}
                onChange={handleEdit}
              />
            </Grid>
            {/* Location select menu:
              "defaultValue" displays the current state of location
              "inputProps" stores the attributes for later use with handleEdit*/}
            <Grid item xs={12}>
              <TextField
                 id="filled-select-locations"
                 select
                 label="Location"
                 helperText="Please select your location"
                 variant="filled"
                 style={{ margin: 4 }}
                 fullWidth
                 align='start'
                 defaultValue={input.location}
                 inputProps={{
                   name: 'location',
                   id: 'user-location',
                 }}
                 onChange={handleEdit}
               >
                 {locations.map((option) => (
                   <MenuItem key={option.value} value={option.value}>
                     {option.label}
                   </MenuItem>
                 ))}
               </TextField>
             </Grid>
          </Grid>
          {/* Save profile button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            startIcon={<SystemUpdateAltIcon />}
            onClick={()=>{setUpdate(true)}}
          >
            Save Update
          </Button>
        </form>
      </div>
    </CssBaseline>
  </Container>
  );
}
export default EditField;
