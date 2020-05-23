import React, { useState } from 'react';
import { Button, GridList, GridListTile, Card, CardHeader, CardMedia, CardContent, CardActions, Typography, Box, Grid, Collapse} from '@material-ui/core';
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
        margin: '20px'
    }
 }))

export default function FrontSection(props){
    const frontcomp = props.frontcomp;
    const classes = useStyles();

    return(
        <Grid container direction='column' justify='center' alignItems='center' className='sectionholder'>
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
            </CardContent>
            <GridList cellHeight={800} cols={1}>
                {tileData.map((tile) => (
                    <GridListTile key={tile.img} cols={tile.cols || 1}>
                        <img src={tile.img} alt={tile.title} />
                    </GridListTile>
                ))}
            </GridList>
        </Grid>
    )
}