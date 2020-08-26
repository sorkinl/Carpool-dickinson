import React from 'react';
import { Button, Card, CardMedia, CardContent, CardActions, Typography, Grid, Paper } from '@material-ui/core';
import fpone from "../static/img/frontpage1.jpg"
import fptwo from "../static/img/frontpage2.jpg"
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Autocomplete from '../components/Autocomplete';
import {useStyles} from './frontSectionStyles';
import TripMainPage from '../components/TripMainPage';


const theme = createMuiTheme({
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  });



export default function FrontSection(props){
    const classes = useStyles();
    return(<>
        <header className={classes.header}>
            <div>
            <div className={classes.logo_box}>
                
            </div>
            <div className={classes.text_box}>
                <h1 className={classes.heading_primary}>
                    <span className={classes.heading_primary_main}>Are you looking for a ride?</span>
                </h1>
                <Link to="/search" className={`${classes.btn} ${classes.btn_white} ${classes.btn_animated}`}>Find a ride</Link>
            </div>
            </div>
        </header>
        <div className="recent-trips">
            <h1 className="recent-trips-header">Recent trips</h1>
            <div className="recent-trips-box"> 
                  <TripMainPage/>  
            </div>
        </div>
        <Card className={classes.rootone}>
            {/*first section with text, 'Find a ride' button and the image */}
            <CardContent className={classes.find}>
                <CardActions className={classes.ride}>
                <Typography variant='h4' component='text1'>
                        Are you looking for a ride to your destination?
                </Typography>
                
                </CardActions>
                <CardActions>
                    <Button
                        component={Link}
                        to='/search'
                        color='primary'
                        variant='outlined'
                        className={classes.findbtn}
                    >
                        Find a ride
                    </Button>
                    <Button
                        component={Link}
                        to='/postRide'
                        color='secondary'
                        variant='outlined'
                        className={classes.findbtn}
                    >
                        Offer a ride
                    </Button>
                </CardActions>
                {/*second section with text, 'About' button and the image */}
            </CardContent>
            <CardMedia
                className={classes.findimg}
                image={fpone}
                title="first img"
            />
                <CardContent className={classes.intro}>
                    <Typography variant='h4' component='text2'>
                            ...About...
                    </Typography>
                    <CardActions>
                        <Button
                            component={Link}
                            to='/search'
                            color='primary'
                            variant='outlined'
                            className={classes.aboutbtn}
                        >
                            About
                        </Button>
                    </CardActions>
                </CardContent>
            <CardMedia
                className={classes.aboutimg}
                image={fptwo}
                title="second img"
            />
            <Grid container spacing={1} className={classes.container}>
                <Grid item xs={12}>
                    <Typography variant='h4' component='text3'>Go anywhere with us</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Paper className={classes.paper}>
                    <Typography variant='h6'>Safe</Typography>
                    <Typography variant='h6'>Drivers are all authorized. And they are students on campus too.</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Paper className={classes.paper}>
                        <Typography variant='h6'>Simple</Typography>
                        <Typography variant='h6'>Enter your location and destination. You can simply find a ride. And connect!</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Paper className={classes.paper}>
                        <Typography variant='h6'>Fast</Typography>
                        <Typography variant='h6'>You can book your ride in advance. No need to wait.</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Card>

    </>);
}