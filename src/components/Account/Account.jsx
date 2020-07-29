import React from 'react';
import Profile from './Profile/Profile';
import TripArea from './TripArea';
import Record from './Record';
import {
  Grid, 
  CssBaseline, 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(30),
    padding: theme.spacing(2),
  },
}));
export default function Account(props) {
  const classes = useStyles();
    return(
        <CssBaseline>
           <header className="account-page">
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Profile/>
              </Grid>
            
              <Grid item xs>
                  <Grid container direction="column" spacing={2}>
                      <Grid container spacing={1} className={classes.container}>
                          <Record/>
                      </Grid>
                      <Grid item xs>
                          <TripArea />  
                      </Grid>
                  </Grid>    
              </Grid>
            </Grid>
          </header>
        </CssBaseline>
      );
}