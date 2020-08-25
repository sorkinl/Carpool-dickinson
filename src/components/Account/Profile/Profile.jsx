import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import {
    Grid,
    Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import {Link } from 'react-router-dom';
import PhotoConsole from "./PhotoConsole";
import  { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

//To be improved:
// + Image preview should be scalable, but not compressed
const defaultMaterialTheme = createMuiTheme({
    overrides: {
        MuiAlert: {
            root: {
                fontFamily: "Lato, sans-serif",
                fontSize: "1.6rem",
            },
            message: {
                transition: "ease 3s"
            }
        },
    }
});

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
/* Display the profile basic info */
export default function Profile(props) {
    const user = useSelector(state => state.firebase.profile);
    const [uploadError, setUploadErr] = useState(false);
    const [deleteError, setDeleteErr] = useState(false);

    function handleErrorClose() {
        setUploadErr(false);
        setDeleteErr(false);
    }
    function setUploadError(isTrue) {
        setUploadErr(isTrue);
    }
    function setDeleteError(isTrue) {
        setDeleteErr(isTrue);
    }
    return (
        <div>
            <div className="profile-card outer-div">
                <div className="profile-card inner-div">
                    <div className="profile-card front">
                        {/* <div className="profile-card front__bkg-photo"></div> */}
                        <p className="section-name">Profile</p>
                        <img className="profile-card front__face-photo front__face-photo--existing"
                            src={user.photoUrl}
                            alt="profile photo"
                        />
                        <span className="profile-card front__photo-console">
                            <PhotoConsole onUploadError={setUploadError} onDeleteError={setDeleteError}/>
                        </span>
                        <div className="profile-card front__text">
                                <h3 className="profile-card front__text-header">{user.firstName} {user.lastName}</h3>
                                <p className="profile-card front__text-para">{user.school} | {user.classYear}</p>                                
                                <Grid container className="record-profile">
                                    <Grid item xs={3}>
                                        <p className="record-main">7</p>
                                        <p className="record-sub">driven</p>
                                    </Grid>
                                    <div className="record-line"></div>
                                    <Grid item xs={3}>
                                        <p className="record-main">10</p>
                                        <p className="record-sub">rides taken</p>
                                    </Grid>
                                    <div className="record-line"></div>
                                    <Grid item xs={3}>
                                        <p className="record-main">20</p>
                                        <p className="record-sub">reviews</p>
                                    </Grid>
                                </Grid>
                                {/* <p className="profile-card front__text--bio-content front__text--bio-content--bio-header"><strong>Bio</strong></p> */}
                                <p className="profile-card front__text--bio-content">"{user.bio}"</p>
                                <Link to="/edit-profile" className="btn btn--editProfile">
                                    Edit profile
                                </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Snackbar open={uploadError === true}
                        autoHideDuration={4000}
                        onClose={handleErrorClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}>
                    <ThemeProvider theme={defaultMaterialTheme}>
                        <Alert onClose={handleErrorClose} severity="error">
                            Failed to upload photo! Try again 
                        </Alert>
                    </ThemeProvider>
            </Snackbar>
            <Snackbar open={deleteError === true}
                        autoHideDuration={4000}
                        onClose={handleErrorClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}>
                    <ThemeProvider theme={defaultMaterialTheme}>
                        <Alert onClose={handleErrorClose} severity="error">
                            Failed to delete photo! Try again
                        </Alert>
                    </ThemeProvider>
            </Snackbar>
        </div>  
    )
}
