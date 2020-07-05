import React from "react";
import {
    Box,
    Button,
    CircularProgress,
    Container,
    CssBaseline,
    Fade,
    Paper,
    Typography,
} from "@material-ui/core";
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {green} from "@material-ui/core/colors";
import {Link} from "react-router-dom";
import './ConfirmField.css';
import {makeStyles} from "@material-ui/core/styles";
import PostRideField from "./PostRideField";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        padding: theme.spacing(4),
    },
    paper: {
        marginTop: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(4),
    },
    title: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        paddingLeft: theme.spacing(4),
    },
    caption: {
        width: "100%", // Fix IE 11 issue.
        paddingLeft: theme.spacing(4),
    },
    submit: {
        margin: theme.spacing(3, 3, 2),
    },
}));

export default function ConfirmField(prop) {
    const classes = useStyles();

    return (
        <div>
            <Container maxWidth="md">
                <CssBaseline/>
                <Paper className={classes.paper} elevation={3}>
                    { prop.load === 'success' ? (
                        <div>
                            <Typography variant="h5"
                                        className={classes.title}
                                        color="primary">
                                Your trip is now posted!
                                <CheckCircleIcon style={{color: green[500]}}/>
                            </Typography>
                            <Typography variant="body2"
                                        className={classes.caption}
                                        color='textSecondary'>
                                <Box fontStyle="italic">
                                    We'll notify you when someone
                                    books your trip.
                                </Box>
                            </Typography>
                        </div>)
                        : (
                            <Fade
                                in={ prop.load === 'progress'}
                                style={{
                                    transitionDelay:
                                        prop.load === 'progress' ?
                                            '1500ms' : '0ms',
                                }}
                                unmountOnExit
                            >
                                <CircularProgress />
                            </Fade>
                        )}
                </Paper>
            </Container>
            {/*<Route path='/'>*/}
            {/*    <Button*/}
            {/*        variant="contained"*/}
            {/*        color="secondary"*/}
            {/*        className={classes.submit}*/}
            {/*        onClick={<PostRideField/>}*/}
            {/*    >*/}
            {/*        Create another ride*/}
            {/*    </Button>*/}
            {/*</Route>*/}
            <Link to="/">
                <Button variant="contained"
                        color="primary"
                        className={classes.submit}
                >
                    Back to home
                </Button>
            </Link>
        </div>
    );
}