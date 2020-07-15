import React, {useState} from 'react';
import {
    makeStyles,
    Container,
    TextField,
    Button,
    Grid,
    CssBaseline,
    Divider,
    MenuItem,
    Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import { useSelector} from 'react-redux';
import firebase from '../../../firebase/firebaseConfig';
import {useFirestore} from "react-redux-firebase";

//A few improvements to be made:
// + Save Update button reloads the page
// + make imgUrl store the photoUrl (optional)
// + add some more edit fields if needed
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
    field: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
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
//Select options of class year
const years = [
    { value: '2019', label: '2019',},
    { value: '2020', label: '2020',},
    { value: '2021', label: '2021',},
    { value: '2022', label: '2022',},
    { value: '2023', label: '2023',},
    { value: '2024', label: '2024',},
    { value: '2025', label: '2025',},
];

// An edit profile component
function EditField(props){
    const classes = useStyles();

    const firestore = useFirestore();
    const currentUser = useSelector((state) => state.firebase.auth);
    const uid = currentUser.uid;
    const [isEdit, setEdit] = useState(false);
    const [isSubmit, setSubmit] = useState(false);

    const allInputs = {imgUrl: ''};
    const [imageFile, setImageAsFile] = useState(null);
    const [imageUrl, setImageAsUrl] = useState(allInputs);

    const [input, setInput] = useState({
        firstName: props.user.firstName,
        lastName: props.user.lastName,
        email: props.user.email,
        phone: props.user.phone,
        classYear: props.user.classYear,
        hub: props.user.hub,
        major: props.user.major,
    });
    const handleEdit = event => {
        const { name, value } = event.target;
        setInput((input) => ({ ...input, [name]: value }));
        setEdit(true);
    };

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
    }

    //A few improvements to be made: add exception handlers, enable image preview before upload
    const handleSubmit = (e) => {
        e.preventDefault();
        //Update photo
        updatePhoto();
        //Update profile info
        if (isEdit === false) {
            console.log("No fields updated");
        } else {
            firestore
                .collection("users")
                .doc(uid)
                .update({...input}
                );
        }
        setSubmit(true);
    }
    const handleImageAsFile = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            setImageAsFile(imageFile => (file));
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
                                    className={classes.field}
                                    placeholder="Your email"
                                    fullWidth
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
                                    id="phone"
                                    label="Phone Number"
                                    fullWidth
                                    className={classes.field}
                                    placeholder="(123)-456-789"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="filled"
                                    defaultValue={input.phone}
                                    inputProps={{
                                        name: 'phone',
                                        id: 'user-phone',
                                    }}
                                    onChange={handleEdit}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="major"
                                    label="Major"
                                    className={classes.field}
                                    placeholder="Your school major(s)"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="filled"
                                    defaultValue={input.major}
                                    inputProps={{
                                        name: 'major',
                                        id: 'user-major',
                                    }}
                                    onChange={handleEdit}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    select
                                    label="Class Year"
                                    variant="filled"
                                    className={classes.textField}
                                    align='start'
                                    defaultValue={input.classYear}
                                    inputProps={{
                                        name: 'classYear',
                                    }}
                                    onChange={handleEdit}
                                >
                                    {years.map((option) => (
                                        <MenuItem value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="HUB Number"
                                    variant="filled"
                                    className={classes.textField}
                                    defaultValue={input.hub}
                                    inputProps={{
                                        name: 'hub',
                                        maxLength: 4,
                                    }}
                                    placeholder="4-digit number"
                                    InputLabelProps={{
                                        shrink: true,
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
                    <Snackbar open={isSubmit}
                              autoHideDuration={6000}
                              anchorOrigin={{
                                  vertical: 'bottom',
                                  horizontal: 'right',
                              }}>
                        <Alert severity="success">
                            Profile updated successfully!
                        </Alert>
                    </Snackbar>
                </div>
            </CssBaseline>
        </Container>
    );
}
export default EditField;