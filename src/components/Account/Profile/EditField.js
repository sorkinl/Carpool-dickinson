import React, {useState} from 'react';
import './EditField.css';
import {makeStyles, Container, TextField, Input, Button, Grid, Box, Paper} from '@material-ui/core';

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
    width: '23ch',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
}));

function EditField(props){
  const classes = useStyles();

  return(
  <Container component="main" maxWidth="xs">
    <div className={classes.paper}>
      <form className={classes.form} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  id="first"
                  placeholder='Your first name'
                  //defaultValue
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    label="Last Name"
                    id="last"
                    placeholder='Your last name'
                    //defaultValue
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
            </Grid>
            <Grid item xs={12}>
                <TextField
                  id="email"
                  label="Email"
                  style={{ margin: 8 }}
                  placeholder="Your email"
                  //helperText
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="phoneNum"
                label="Phone Number"
                style={{ margin: 8 }}
                //helperText
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
            </Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Save
              </Button>
            </Grid>
          </form>
      </div>
  </Container>
  );
}
export default EditField;
