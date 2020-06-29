import React, {useState} from 'react';
import {makeStyles, Container, TextField, Button, Grid, CssBaseline, MenuItem, Divider} from '@material-ui/core';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import { useSelector} from 'react-redux';
import firebase from '../../../firebase/firebaseConfig';
import {useFirestore} from "react-redux-firebase";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '34ch',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    input: {
        display: 'none',
    },
    submit: {
        margin: theme.spacing(3,3, 2),
    },
}));

// An edit profile component
function EditField(props){
    const classes = useStyles();

    const firestore = useFirestore();
    const currentUser = useSelector((state) => state.firebase.auth);

    const allInputs = {imgUrl: ''};
    const [imageFile, setImageAsFile] = useState("");
    const [imageUrl, setImageAsUrl] = useState(allInputs);

    const [input, setInput] = useState({
        firstName: props.user.firstName,
        lastName: props.user.lastName,
        email: props.user.email,
        phoneNum: props.user.phone}
    );

    const handleEdit = event => {
        const { name, value } = event.target;
        setInput({ [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        //Only handling photo upload for now. Profile data later
        //Upcoming tasks: add exception handlers, limit photo size, async upload button
        console.log('start of upload')
        if(imageFile === null ) {
            console.error(`not an image, the image file is a ${typeof(imageFile)}`)
        }
        const metadata = {
            contentType: imageFile.type
        }
        const storageRef = firebase.storage().ref();
        const uploadTask = storageRef.child('images/' + imageFile.name).put(imageFile, metadata);
        uploadTask.on('state_changed',
            (snapShot) => {
                //takes a snap shot of the process as it is happening
                console.log(snapShot)
            }, (err) => {
                //catches the errors
                console.log(err)
            }, () => {
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    setImageAsUrl(prevObject => ({...prevObject, imgUrl: downloadURL}))
                    console.log(downloadURL); //OK
                    console.log(imageUrl); //undefined --> weird

                    firestore.collection("users").doc(currentUser.uid).set({
                        photoUrl: downloadURL
                    }, { merge: true })
                });
            })
    }

    function handleImageAsFile(e){
        const file = e.target.files[0];
        setImageAsFile(imageFile => (file));
    }
    return(
        <Container component="main" maxWidth="sm">
            <CssBaseline>
                <Divider />
                <div className={classes.paper}>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        {/* A grid container storing each grid item as a textbox */}
                        <Grid container spacing={3}>
                            {/* Change profile photo button */}
                            <Grid xs={12}>
                                <input /*accept="image/*"*/ className={classes.input} id="contained-button-file" type="file" onClick={handleImageAsFile}></input>
                                <label htmlFor="contained-button-file">
                                    <Button variant="contained" color="primary" component="span" >
                                        Change profile photo
                                    </Button>
                                </label>
                            </Grid>
                            {/* First name textbox:
               "defaultValue" displays the current state of firstName
               "inputProps" stores the attributes for later use with handleEdit*/}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    label="First Name"
                                    id="first"
                                    placeholder='Your first name'
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="filled"
                                    defaultValue={input.firstName}
                                    inputProps={{
                                        name: 'firstName',
                                        id: 'user-first',
                                    }}
                                    onChange={handleEdit}
                                />
                            </Grid>
                            {/* Last name textbox:
              "defaultValue" displays the current state of lastName
              "inputProps" stores the attributes for later use with handleEdit*/}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    label="Last Name"
                                    id="last"
                                    placeholder='Your last name'
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="filled"
                                    defaultValue={input.lastName}
                                    inputProps={{
                                        name: 'lastName',
                                        id: 'user-last',
                                    }}
                                    onChange={handleEdit}
                                />
                            </Grid>
                            {/* Email textbox:
              "defaultValue" displays the current state of email
              "inputProps" stores the attributes for later use with handleEdit*/}
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="email"
                                    label="Email"
                                    style={{ margin: 4 }}
                                    placeholder="Your email"
                                    helperText="Please enter your email"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="filled"
                                    defaultValue={input.email}
                                    inputProps={{
                                        name: 'email',
                                        id: 'user-name',
                                    }}
                                    onChange={handleEdit}
                                />
                            </Grid>
                            {/* Phone number textbox:
              "defaultValue" displays the current state of phone number
              "inputProps" stores the attributes for later use with handleEdit*/}
                            <Grid item xs={12}>
                                <TextField
                                    id="phoneNum"
                                    label="Phone Number"
                                    style={{ margin: 4 }}
                                    fullWidth
                                    placeholder="(123)-456-789"
                                    helperText="Please enter your phone number"
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="filled"
                                    defaultValue={input.phoneNum}
                                    inputProps={{
                                        name: 'phoneNum',
                                        id: 'user-phoneNum',
                                    }}
                                    onChange={handleEdit}
                                />
                            </Grid>
                        </Grid>
                        {/* Save profile button */}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            startIcon={<SystemUpdateAltIcon />}
                        >
                            Save Update
                        </Button>
                    </form>
                </div>
            </CssBaseline>
        </Container>
    );
}
export default EditField;