import React from 'react';
import { Button, Card, CardMedia, CardContent, CardActions, Typography} from '@material-ui/core';
import fpone from "../static/img/frontpage1.jpg"
import fptwo from "../static/img/frontpage2.jpg"
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';



 const useStyles = makeStyles((theme) => ({
    find: {
        height:150,
        position: 'center',
    },
    ride: {
        textAlign:'center',
        height: '50px',
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
    },
    findimg: {
        height: 800,
    },
 }))

export default function FrontSection(props){
    const classes = useStyles();
    return(
        <Card className={classes.rootone}>
            {/*first section with text, 'Find a ride' button and the image */}
            <CardContent classNAme={classes.find}>
                <Typography variant='h4' component='text1'>
                        Are you looking for a ride to your destination?
                </Typography>
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
                        <CardContent classNAme={classes.intro}>
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
        </Card>

    );
}