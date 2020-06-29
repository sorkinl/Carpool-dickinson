import React, {useState} from 'react';
import {makeStyles, Container, Input, TextField, Button, Grid, CssBaseline, MenuItem, Divider, Typography} from '@material-ui/core';
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
    const uid = currentUser.uid;
    const [isEdit, setEdit] = useState(false);

    const allInputs = {imgUrl: ''};
    const [imageFile, setImageAsFile] = useState(null);
    const [imageUrl, setImageAsUrl] = useState(allInputs);

    const [input, setInput] = useState({
        firstName: props.user.firstName,
        lastName: props.user.lastName,
        email: props.user.email,
        phone: props.user.phone}
    );

    const handleEdit = event => {
        const { name, value } = event.target;
        setInput({ [name]: value });
        setEdit(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //Upcoming tasks: add exception handlers, limit photo size, async upload button

        //Update photo Url
        console.log('start of upload')
        if(imageFile === null ) {
            console.error(`not an image OR no images uploaded`)
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
                }, (err) => {
                    //catches the errors
                    console.log(err)
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
                        });
                })
        }
        //Update profile info
        console.log(Object.assign({}, input));
        if (isEdit === false) {
            console.log("No fields updated");
        } else {
            firestore
                .collection("users")
                .doc(uid)
                .update(
                    Object.assign({}, input)
                    // {
                    //     "firstName": input.firstName,
                    //     "lastName": input.lastName,
                    //     "email": input.email,
                    //     "phoneNum": input.phone,
                    // },
                );
        }
    }
    const handleImageAsFile = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            setImageAsFile(imageFile => (file));
            console.log(file);
       }
    }
    return(
        <Container component="main" maxWidth="sm">
            <CssBaseline>
                <Divider />
                <div className={classes.paper}>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                    onChange={handleImageAsFile}
                                />
                                <label htmlFor="contained-button-file">
                                    <Button variant="contained" color="primary" component="span">
                                        Upload profile photo
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
                                    defaultValue={input.phone}
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