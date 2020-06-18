import React from 'react';
import { Button, Card, CardMedia, CardContent, CardActions, Typography, Grid, Paper } from '@material-ui/core';
import fpone from "../static/img/frontpage1.jpg"
import fptwo from "../static/img/frontpage2.jpg"
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

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



 const useStyles = makeStyles({

    ride: {
        padding: 50,
        height: '50px',
        marginLeft: 200
    },
    findbtn: {
        margin: '20px',
        left: 470
    },
    aboutbtn: {
        margin: '20px',
        left: 470
    },
    aboutimg: {
        height: 800,
        margin: '50px'
    },
    findimg: {
        height: 800,
        margin: '50px'
    },
    paper: {
        height: 200,
        margin: '30px'
    },
    topImage: {
        height: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '-16px',
        
    },
    find: {
        position: 'relative',
    },
    rideText: {
        position: 'absolute',
        width: '350px',
        height: '200px',
        top: '100px',
        left: '10px',
        color: '#EEE5D0',
        fontFamily: 'Merriweather',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '50px',
        lineHeight: '48px',
        textAllign: 'left',
        allignSelf: 'stretch',
    },
    findButton: {
        position: 'absolute',
        width: '200px',
        height: '53px',
        left: '50px',
        top: '240px',
        fontFamily: 'Merriweather',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '26px',
        lineHeight: '33px',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        background: '#EEE5D0',
         "&:hover": { backgroundColor: '#E0D2B2'},
        borderRadius: '10px',
         

    }
 });

export default function FrontSection(props){
    const classes = useStyles();
    return(
        <Card>
            <CardContent className={classes.find}>
            <CardMedia
                className={classes.topImage}
                image={fptwo}
                title="first img"
            />
                <Typography className={classes.rideText}>
                        Looking for a ride?
                </Typography>
                <Button 
                    component={Link} 
                    to='/search' 
                    
                    className={classes.findButton}
                    >
                        Find a ride
                 </Button>

            </CardContent>
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
                    disableElevation
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

    );
}