import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import firebase from '../../../firebase/firebaseConfig';
import {useFirestore, useFirebase} from "react-redux-firebase";
import {
    Grid,
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import {
    faCamera,
    faImage,
    faTrashAlt,
    faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageUploading from "react-images-uploading";
import  { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Loader from 'react-loader-spinner';

const defaultMaterialTheme = createMuiTheme({
    overrides: {
        MuiDialog: {
            paper: {
                width: "65rem",
                borderRadius: "1rem",
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

export default function PhotoConsole(props) {
    const firestore = useFirestore();
    const firebaseHook = useFirebase();//literally "firebase" but to distinguish with the regular firebase
    const user = useSelector(state => state.firebase.profile);
    const currentUser = useSelector((state) => state.firebase.auth);
    const uid = currentUser.uid;
    let userDefaultPhoto = "https://www.psi.org.kh/wp-content/uploads/2019/01/profile-icon-300x300.png";

    //Dialog + error states
    const [showDialog, setDialog] = useState(false);
    const [showDelete, setDelete] = useState(false);

     //Dialog action states
     const [isSaved, setSave] = useState(false);
     const [showSpinner, setSpinner] = useState(false);
     const [active, setActive] = useState(false);

    //Image file states
    const allInputs = {imgUrl: ''};
    const [imageFile, setImageAsFile] = useState(null);
    const [imageUrl, setImageAsUrl] = useState(allInputs);

    function showUploadDialog() {
        setDialog(true);
        setActive(!active)
    }
    function showDeleteDialog() {
        setDelete(true);
        setActive(!active)
    }
    function handleDialogClose() {
        setDialog(false);
        setDelete(false);
    }
    //Get files from upload
    function handleImageAsFile(imageList) {
        if (imageList[0]) {
            if(imageList[0].file){
                setSave(true);
                console.log(imageList[0].file);
                const file = imageList[0].file;
                setImageAsFile(imageFile => (file));
            }
        }
        else {
            setSave(false);
        }
    }
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
            const uploadTask = storageRef
                                .child('images/' + imageFile.name)
                                .put(imageFile, metadata);
            uploadTask.on('state_changed',
                (snapShot) => {
                    //takes a snap shot of the process as it is happening
                    console.log(snapShot)
                }, (error) => {
                    switch (error.code) {
                        case 'storage/unknown': //unknown error
                            console.log(error);
                            props.onUploadError(true);
                            break;
                        }
                }, () => {
                    uploadTask
                        .snapshot
                        .ref
                        .getDownloadURL()
                        .then(function(downloadURL) {
                            setImageAsUrl(prevObject => ({
                                ...prevObject, imgUrl: downloadURL
                            }))
                            if(user.photoUrl !== userDefaultPhoto) {
                                const prevImageName = firebase.storage().refFromURL(user.photoUrl)
                                                                        .location
                                                                        .path_;
                                console.log('path of prev photo', prevImageName);
                                deletePrevPhoto(prevImageName); //remove the previous photo if not default
                            }
                            firestore.collection("users").doc(uid).set({
                                photoUrl: downloadURL,
                            }, { merge: true })
                            setSpinner(false);
                            handleDialogClose();
                        });
                })
        }
    }
    const deletePhoto = async () => {
        try {
            setDelete(false);
            const photoName = firebase.storage()
                                .refFromURL(user.photoUrl)
                                .location
                                .path_; //extract image's name from downloadUrl
            await firestore.collection("users")
                            .doc(uid)
                            .update({photoUrl: userDefaultPhoto}); //delete from firestore
            await firebaseHook.deleteFile(photoName); //delete from storage
        } 
        catch(error) {
            console.log("Error deleting current photo in deletePhoto(): ", error);
            props.onDeleteError(true);
        }
    }
    const deletePrevPhoto = async (prevImageName) => {
        try {
            await firebaseHook.deleteFile(prevImageName);
        }
        catch(error) {
            console.log("Error deleting previous photo in deletePrevPhoto(): ", error)
        }
    }
    function savePhotoUpdate() {
        try {
            setSave(false);
            setSpinner(true);
            updatePhoto();
        }
        catch(error) {
            console.log("Error uploading photo in savePhotoUpdate(): ", error);
            setSpinner(false);
            props.onUploadError(true);
        }
    }
    return (
        <div>
            <div id="photoMenu1" className={`photo-menu photo-menu-left ${active ? "active" : ""}`}>
                <div className="photo-floating-btn" onClick={() => setActive(!active)}>
                    <FontAwesomeIcon className="photo-floating-btn-icon" icon={faEdit}/>
                </div>
                <menu className="photo-items-wrapper">
                    <div className="photo-menu-item" 
                        onClick={showUploadDialog}>
                        <FontAwesomeIcon className="photo-menu-item-icon" icon={faCamera}
                        />
                    </div>
                    <div disabled={user.photoUrl === userDefaultPhoto} 
                        className="photo-menu-item" 
                        onClick={showDeleteDialog}> 
                        <FontAwesomeIcon className="photo-menu-item-icon" icon={faTrashAlt}
                        />
                    </div>
                </menu>
            </div>
            <ThemeProvider theme={defaultMaterialTheme}>
                <Dialog open={showDialog} disableEscapeKeyDown={true} disableBackdropClick="true">
                    <div className="upload-photo">
                        <DialogTitle>
                            <p className="upload-photo__title">Select profile photo</p>
                        </DialogTitle>
                        <DialogContent dividers>
                            <div className="upload-photo__wrapper">
                                <ImageUploading  onChange={handleImageAsFile}>
                                    {({ imageList, onImageUpload }) => (
                                        <div className="upload-photo__preview-container">
                                            <div onClick={onImageUpload} 
                                                className="upload-photo__upload-btn">Upload photo</div>
                                            <div className="upload-photo__skeleton">
                                                <span>
                                                    <FontAwesomeIcon className="upload-photo__icon" 
                                                                    icon={faImage}></FontAwesomeIcon>
                                                </span>
                                                <p className="upload-photo__security-note">
                                                    Your profile photo is only visible to DPool users
                                                </p>
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
                                                    <img src={image.dataURL} alt="" width="100" 
                                                        className="upload-photo__photo-container__active-photo"/>
                                                    <div disabled={showSpinner === true} onClick={image.onRemove}
                                                        className="upload-photo__photo-container__remove-btn">
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
                                    <div disabled={showSpinner === true} onClick={handleDialogClose} 
                                        className="upload-photo__buttons upload-photo__buttons--cancel">Cancel</div>
                                </Grid>
                                <Grid item xs sm={6}>  
                                    <div disabled={isSaved === false} onClick={savePhotoUpdate} 
                                        className="upload-photo__buttons upload-photo__buttons--save">Save</div>
                                </Grid>
                            </Grid>
                        </DialogActions>
                    </div>                 
                </Dialog>
            </ThemeProvider>
            <ThemeProvider theme={defaultMaterialTheme}>
                <Dialog open={showDelete}>
                    <DialogContent>
                        <div className="upload-photo__delete-photo">
                            <p className="upload-photo__delete-photo--prompt-text">
                                Are you sure you want to delete this profile photo?
                            </p>                           
                        </div>
                    </DialogContent>     
                    <DialogActions>
                        <Grid container justify="flex-end" className="upload-photo__buttons">
                            <Grid item xs sm={6}>  
                                <div onClick={handleDialogClose} 
                                    className="upload-photo__buttons upload-photo__buttons--save">No</div>
                            </Grid>
                            <Grid item xs={5} sm={6}>
                                <div  onClick={deletePhoto} 
                                    className="upload-photo__buttons upload-photo__buttons--cancel">Yes</div>
                            </Grid>
                        </Grid>
                    </DialogActions>                 
                </Dialog>
            </ThemeProvider>
        </div>
    );
}