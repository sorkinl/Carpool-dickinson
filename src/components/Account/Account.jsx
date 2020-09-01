import React from 'react';
import Profile from './Profile/Profile';
import TripArea from './TripArea';
import Setting from './Setting';
import {isLoaded} from "react-redux-firebase";
import { useSelector } from 'react-redux';
import Loading from "../Loading";
import {
  Grid, 
  CssBaseline, 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SideBar from '../Dashboard/SideBar';
// import HeaderBar from '../Dashboard/HeaderBar';


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
  const user = useSelector(state => state.firebase.profile);

    return(
      <div>
          {isLoaded(user) ?
          <CssBaseline>
            {/* <SideBar/> */}
            {/* <HeaderBar /> */}
            {/* <div className="content-dashboard">
            <DashboardSideBar/> */}
            <header className="page-layout account-page">
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Profile/>
                </Grid>
                <Grid item xs>
                    <Grid container direction="column" spacing={1}>
                        {/* <Grid container spacing={1} className={classes.container}>
                            <Record/>
                        </Grid> */}
                        <Grid item xs>
                            <Setting/>
                        </Grid>
                        {/* <Grid item xs>
                            <TripArea />  
                        </Grid> */}
                    </Grid>    
                </Grid>
              </Grid>
            </header>
            {/* </div> */}
          </CssBaseline>
          : <Loading/> }
        </div>
      );
}