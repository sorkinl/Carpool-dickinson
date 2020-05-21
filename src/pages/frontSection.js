import React, { useState } from 'react';
import {makeStyles, CssBaseline, Button, GridList, GridListTile, Card, CardHeader, CardMedia, CardContent, CardActions, Typography, Box, Grid, Collapse} from '@material-ui/core';
import fpone from "../static/img/frontpage1.jpg"
import fptwo from "../static/img/frontpage2.jpg"
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

// const useStyles = makeStyles((theme) => ({

// }))
export default function frontSection(props){
    const frontcomp = props.frontcomp;
    //const classes = useStyles();

    return(
        <Grid item xs={8} className='sectionholder'>
            <GridList cellHieght={120} cols={1}>
                {tileData.map((tile) => (
                    <GridListTile key={tile.img} cols={tile.cols || 1}>
                        <img src={tile.img} alt={tile.title} />
                    </GridListTile>
                ))}
            </GridList>
        </Grid>
    )
}