import React, {useState} from 'react';
import './EditField.css';
import {makeStyles, Container, TextField,Button, Grid, Box, Paper, CssBaseline, MenuItem} from '@material-ui/core';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';

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

}));

const locations = [
  { value: 'school', label: 'Dickinson College',},
  { value: 'town', label: 'Carlisle, PA',},
  { value: 'nyc', label: 'New York, NY',},
];

function EditField(props){
  const classes = useStyles();
  const[isUpdated, setUpdate]= useState(false);

  const handleEdit = event => {
      props.onEdit(event);
  };

  return(
  <Container component="main" maxWidth="sm">
    <CssBaseline>
    <div className={classes.paper}>
      <form className={classes.form} noValidate autoComplete="off">
        <Grid container spacing={2}>
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
                  defaultValue={props.firstName}
                  inputProps={{
                    name: 'firstName',
                    id: 'user-first',
                  }}
                  onChange={handleEdit}
                />
            </Grid>
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
                    defaultValue={props.lastName}
                    inputProps={{
                      name: 'lastName',
                      id: 'user-last',
                    }}
                    onChange={handleEdit}
                  />
            </Grid>
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
                  defaultValue={props.email}
                  inputProps={{
                    name: 'email',
                    id: 'user-name',
                  }}
                  onChange={handleEdit}
                />
            </Grid>
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
                defaultValue={props.phoneNum}
                inputProps={{
                  name: 'phoneNum',
                  id: 'user-phoneNum',
                }}
                onChange={handleEdit}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                 id="filled-select-currency"
                 select
                 label="Location"
                 helperText="Please select your location"
                 variant="filled"
                 style={{ margin: 4 }}
                 fullWidth
                 align='start'
                 defaultValue={props.location}
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

        </form>
      </div>
    </CssBaseline>
  </Container>
  );
}
export default EditField;
