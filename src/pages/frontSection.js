import React, { useState } from 'react';
import { Button, GridList, Card, CardMedia, CardContent, CardActions, CardActionArea, Typography, Box, Grid, Collapse} from '@material-ui/core';
import fpone from "../static/img/frontpage1.jpg"
import fptwo from "../static/img/frontpage2.jpg"
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const tileData = [
    {
        img: fpone,
        title: 'fp1',
        cols: 1,
    },
    {
        img: fptwo,
        title: 'fp2',
        cols: 1,
    }
]

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
  /*  return(
        <GridList cellHeight={800} cols={1} alignItems='center' className='sectionholder'>
            <CardContent className={classes.find}>
                    <Typography variant='h4' component='text1'>
                        Are you looking for a ride to your destination?
                    </Typography>
                    <Grid className={classes.ride}>
                        <Button 
                            component={Link} 
                            to='/search' 
                            color='primary' 
                            variant='outlined'
                            className={classes.findbtn}
                            >
                                Find a ride
                        </Button>
                    </Grid>
                    <CardMedia
                        className={classes.findimg}
                        image={fpone}
                        title="first img"
                    />
            </CardContent>
            <CardContent className={classes.intro}>
                    <Typography variant='h4' component='text1'>
                        ...About...
                    </Typography>
                    <Grid className={classes.about}>
                        <Button 
                            component={Link} 
                            to='/search' 
                            color='primary' 
                            variant='outlined'
                            className={classes.aboutbtn}
                            >
                                About
                        </Button>
                    </Grid>
                    <CardMedia
                        className={classes.aboutimg}
                        image={fptwo}
                        title="second img"
                    />
            </CardContent>
        </GridList>
    )*/
}