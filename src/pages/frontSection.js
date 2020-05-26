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
 });

export default function FrontSection(props){
    const classes = useStyles();
    return(
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