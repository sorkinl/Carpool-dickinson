import React, {useState} from 'react';
import unnamed from '../../../assets/images/unnamed.jpg';
import { useSelector } from 'react-redux';
import firebase from '../../../firebase/firebaseConfig';
import {useFirestore} from "react-redux-firebase";
import {
    Grid,
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import {Link } from 'react-router-dom';
import {
    faCamera,
    faImage,
    faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageUploading from "react-images-uploading";
import  { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Loader from 'react-loader-spinner';

//To be improved:
// Image preview should be scalable, but not compressed


const defaultMaterialTheme = createMuiTheme({
    overrides: {
        MuiDialog: {
            paper: {
                width: "65rem",
                borderRadius: "2rem",
            },
            paperWidthSm: {
                maxWidth: "65rem",
            }
        },
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
export default function Profile(props){
    const [showDialog, setDialog] = useState(false);

    const allInputs = {imgUrl: ''};
    const [imageFile, setImageAsFile] = useState(null);
    const [imageUrl, setImageAsUrl] = useState(allInputs);

    const firestore = useFirestore();
    const user = useSelector(state => state.firebase.profile);
    const currentUser = useSelector((state) => state.firebase.auth);
    const uid = currentUser.uid;

    const [urlExists, setUrlExists] = useState(user.photoUrl);
    const [uploadError, setUploadError] = useState(false);
    const [isSaved, setSave] = useState(false);
    const [showSpinner, setSpinner] = useState(false);

    function handleErrorClose() {
        setUploadError(false);
    };
    function showUploadDialog() {
        setDialog(true);
    }
    function handleDialogClose() {
        setDialog(false);
    }
    function handleImageAsFile(imageList) {
        if (imageList[0]) {
            if(imageList[0].file){
                setSave(true)
                console.log(imageList[0].file);
                const file = imageList[0].file;
                setImageAsFile(imageFile => (file));
            }
        }
        else {
            setSave(false);
        }
    }
    console.log("isSaved", isSaved);
    const updatePhoto = () => {
        //Update photo Url
        console.log('Start of upload')
        if(imageFile === null ) {
            console.error(`Not an image OR no images uploaded`)
        }
        else {
            const metadata = {
                contentType: imageFile.type
            }
            const storageRef = firebase.storage().ref();
            const uploadTask = storageRef.child('images/' + imageFile.name).put(imageFile, metadata);
            uploadTask.on('state_changed',
                (snapShot) => {
                    //takes a snap shot of the process as it is happening
                    console.log(snapShot)
                }, (error) => {
                    switch (error.code) {
                        case 'storage/unknown': //unknown error
                            console.log(error)
                            setUploadError(true);
                            break;
                        }
                }, () => {
                    uploadTask
                        .snapshot
                        .ref
                        .getDownloadURL()
                        .then(function(downloadURL) {
                            setImageAsUrl(prevObject => ({...prevObject, imgUrl: downloadURL}))
                            console.log(downloadURL); //OK
                            console.log(imageUrl); //undefined --> weird
                            firestore.collection("users").doc(uid).set({
                                photoUrl: downloadURL
                            }, { merge: true })
                            setUrlExists(downloadURL);
                            setSpinner(false);
                            handleDialogClose();
                        });
                })
        }
    }
    function savePhotoUpdate() {
        try {
            setSave(false);
            setSpinner(true);
            updatePhoto();
        }
        catch(err) {
            console.log(err);
            setSpinner(false);
            setUploadError(true);
        }
    }
    console.log("showSpinner ", showSpinner);
    console.log("isSaved", isSaved);
    return (
        <div>
            <div className="profile-card outer-div">
                <div className="profile-card inner-div">
                    <div className="profile-card front">
                        {/* <div className="profile-card front__bkg-photo"></div> */}
                        <p className="section-name">Profile</p>
                        <img disabled={urlExists !== ""} className="profile-card front__face-photo front__face-photo--none" src={unnamed} alt=""/>
                        <img className="profile-card front__face-photo front__face-photo--existing"
                            src={user.photoUrl}
                            alt=""
                        /><span className="profile-card front__photo-button" onClick={showUploadDialog}>
                            <FontAwesomeIcon className="photo-button-icon" icon={ faCamera}></FontAwesomeIcon>
                        </span>
                        <div className="profile-card front__text">
                            <h3 className="profile-card front__text-header">{user.firstName} {user.lastName}</h3>
                            <p className="profile-card front__text-para">{user.school} | {user.classYear}</p>
                            <Grid container className="record-profile">
                                <Grid item xs={3}>
                                    <p className="record-main">7</p>
                                    <p className="record-sub">offers</p>
                                </Grid>
                                <div className="record-line"></div>
                                <Grid item xs={3}>
                                    <p className="record-main">10</p>
                                    <p className="record-sub">rides</p>
                                </Grid>
                                <div className="record-line"></div>
                                <Grid item xs={3}>
                                    <p className="record-main">20</p>
                                    <p className="record-sub">reviews</p>
                                </Grid>
                            </Grid>
                            {/* <Link to="/edit-profile" className="btn btn--editProfile"> */}
                                <Link to="/edit-profile" className="btn btn--editProfile">
                                    Edit profile
                                </Link>
                            {/* </Link> */}
                        </div>
                    </div>
                </div>
            </div>
            <ThemeProvider theme={defaultMaterialTheme}>
                <Dialog open={showDialog} disableEscapeKeyDown={true}>
                {/* disableBackdropClick="true" disableEscapeKeyDown="true" */}
                    <div className="upload-photo">
                        <DialogTitle>
                            <p className="upload-photo__title">Select profile photo</p>
                        </DialogTitle>
                        <DialogContent dividers>
                            <div className="upload-photo__wrapper">
                                <ImageUploading  onChange={handleImageAsFile}>
                                    {({ imageList, onImageUpload }) => (
                                        <div className="upload-photo__preview-container">
                                            <div onClick={onImageUpload} className="upload-photo__upload-btn">Upload photo</div>
                                            <div className="upload-photo__skeleton">
                                                <span>
                                                    <FontAwesomeIcon className="upload-photo__icon" icon={faImage}></FontAwesomeIcon>
                                                </span>
                                                <p className="upload-photo__security-note">Your profile photo is only visible to DPool users</p>
                                                {showSpinner === true ? 
                                                    <div className="upload-photo__loader">
                                                        <Loader
                                                            type= "BallTriangle"
                                                            color="#fff"
                                                            height={84}
                                                            width={84}
                                                        />
                                                    </div> 
                                                : ""}
                                            </div>
                                            {imageList.map(image => (
                                                <div key={image.key} className="upload-photo__photo-container">
                                                    <img src={image.dataURL} alt="" width="100" className="upload-photo__photo-container__active-photo"/>
                                                    <div disabled={showSpinner === true} className="upload-photo__photo-container__remove-btn" onClick={image.onRemove}>
                                                        <span>
                                                            <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                            
                                        </div>
                                    )}
                                </ImageUploading>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Grid container justify="flex-end" className="upload-photo__buttons">
                                <Grid item xs={5} sm={6}>
                                    <div disabled={showSpinner === true} onClick={handleDialogClose} className="upload-photo__buttons upload-photo__buttons--cancel">Cancel</div>
                                </Grid>
                                <Grid item xs sm={6}>  
                                    <div disabled={isSaved === false} onClick={savePhotoUpdate} className="upload-photo__buttons upload-photo__buttons--save">Save</div>
                                </Grid>
                            </Grid>
                        </DialogActions>
                    </div>                 
                </Dialog>
            </ThemeProvider>
            <Snackbar open={uploadError === true}
                        autoHideDuration={4000}
                        onClose={handleErrorClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}>
                    <ThemeProvider theme={defaultMaterialTheme}>
                        <Alert onClose={handleErrorClose} severity="error">
                            Error uploading photo! Try again 
                        </Alert>
                    </ThemeProvider>
            </Snackbar>
        </div>  
    )
}
