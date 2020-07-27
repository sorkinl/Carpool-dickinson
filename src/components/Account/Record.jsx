import React from 'react';
import {
    makeStyles,
    Typography,
    Grid,
    Paper,
} from '@material-ui/core';
const useStyles = makeStyles((theme)=>({
    container: {
        marginTop: theme.spacing(7),
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(30),
        padding: theme.spacing(2),
    },  
    card: {
        textAlign: 'center',
        height: "150px",
        width:"390px",
        borderRadius: "2rem",
        backgroundColor: "rgba(111, 231, 221, 0.4)", //$color-primary-dark
        padding: theme.spacing(4),
      },
      cardText: {
        fontWeight: "600",
        fontSize: "60px",
        color: "#FFF0A5",
        marginTop: "-10px",
      },
      cardTextSub: {
        fontWeight: "50px",
        fontSize: "18px",
        color: "#FFF0A5",
        marginTop: "-15px",
        fontFamily: `"Lato", "sans-serif"`,
      }
}));
export default function Record(props){
    const classes = useStyles();

    return (
        <>
            <Grid item xs={6} sm={6}>
                <Paper elevation={0} className={classes.card}>
                    <Typography className={classes.cardText}>7</Typography>
                    <Typography className={classes.cardTextSub} gutterBottom>Total Trips Offered</Typography>
                </Paper>
            </Grid>
            <Grid item xs={6} sm={6}>
                <Paper elevation={0} className={classes.card}>
                    <Typography className={classes.cardText}>20+</Typography>
                    <Typography className={classes.cardTextSub} gutterBottom>Reviews</Typography>
                </Paper>
            </Grid>
        </>
    )
}