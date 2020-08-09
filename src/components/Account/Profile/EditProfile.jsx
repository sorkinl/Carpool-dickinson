import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import {
    Grid, 
    CssBaseline, 
    MenuItem,
    Snackbar,
    Dialog,
} from '@material-ui/core';
import  { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import {useFirestore} from "react-redux-firebase";
import {
    faChevronLeft,
    faUnlock
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import guy from '../../../assets/images/edit_profile.svg';
import girl  from '../../../assets/images/freelancer_blue.svg';
import Loader from 'react-loader-spinner';
//Select options of class year
// const years = [
//     { value: '2019', label: '2019',},
//     { value: '2020', label: '2020',},
//     { value: '2021', label: '2021',},
//     { value: '2022', label: '2022',},
//     { value: '2023', label: '2023',},
//     { value: '2024', label: '2024',},
//     { value: '2025', label: '2025',},
// ];
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
        MuiDialog: {
            paper: {
                boxShadow: "none",
                backgroundColor: "transparent",
                top: "-9rem",
            }
        }
    }
});
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function EditProfile(props) {
    
    const user = useSelector(state => state.firebase.profile);
    const firestore = useFirestore();
    const currentUser = useSelector((state) => state.firebase.auth);
    const uid = currentUser.uid;
    
    const [isEdited, setEdited] = useState(false);
    const [isSubmitted, setSubmit] = useState('');
    const [emptyError, setEmptyError] = useState(false);
    const [open, setOpen] = useState(false);
    
    const [input, setInput] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        school: user.school,
        email: user.email,
        phone: user.phone,
        major: user.major,
        classYear: user.classYear,
        hub: user.hub
    });
    const initValue = {
        firstName: user.firstName,
        lastName: user.lastName,
        school: user.school,
        email: user.email,
        phone: user.phone,
        major: user.major,
        classYear: user.classYear,
        hub: user.hub
    }
    function checkNoEdit(key, value) {
        if(initValue[key] === value) {
            setEdited(false);
        } 
        else {
            setEdited(true);
        }      
    }    
    function handleEdit(event) {
        const { name, value } = event.target;
        setInput((input) => ({ ...input, [name]: value }));
        checkNoEdit(name, value);
    };
    function handleClose() {
        setEmptyError(false);
        setSubmit('');
    };
    function checkEmptyInput() {
        if(input.firstName === ""
            || input.lastName === ""
            || input.email === ""
            || input.school === "") {
            return false;
        } else {
            return true;
        }
    }
    function handleSubmit(e) {
        e.preventDefault();
        if (checkEmptyInput() === false) {
            setEmptyError(true);
        } else {
            setOpen(true);
            submitProfile();
        }
    }
    const submitProfile = async () => {
        try {
            await firestore
                    .collection("users")
                    .doc(uid)
                    .update({...input}
                );
            setOpen(false);
            setSubmit("submit-success"); 
            setEdited(false);   
        }
        catch (error) {
            console.log("Update profile error", error);
            setOpen("inactive");
            setSubmit("submit-error");
        }
    }
    console.log(isSubmitted);
    return (
        <CssBaseline>
        <header className="account-page">
                <div className="edit-profile__top-illustration">
                    <img src={guy} alt="" className="edit-profile__top-illustration--image"/>
                </div>
                <div  className="edit-profile">
                <a href='/account' className="edit-profile-btn edit-profile-btn--back">
                    <span><FontAwesomeIcon className="edit-profile-icon" icon={faChevronLeft}></FontAwesomeIcon></span>
                    Back to profile
                </a>
                <form onSubmit={handleSubmit}>
                    <div className="edit-profile-main">
                        <div className="edit-profile-boxTitle">
                            <p className="text">Edit profile</p>
                        </div>
                        <section className="profile-basic-info">
                            <h3>Basic info</h3>
                            <Grid container className="content">
                                {/* First Name */}
                                <Grid item xs={6} sm={6} spacing={2}>
                                    <label for="basic-first-name" className="basic-info-label">First name*</label>
                                    <input id="basic-first-name" required type="text"  name="firstName" value={input.firstName} 
                                        placeholder="Your first name" onChange={handleEdit}/>
                                </Grid>
                                {/* Last Name */}
                                <Grid item xs={6} sm={6}>
                                <label for="basic-last-name" className="basic-info-label">Last name*</label>  
                                    <input id="basic-last-name" required type="text" name="lastName" value={input.lastName}
                                        placeholder="Your last name" onChange={handleEdit} /> 
                                </Grid>
                                {/* School */}
                                <Grid item xs={12} className="basic-sub-box">
                                    <label for="basic-school" className="basic-info-label">School name*</label>
                                    <input id="basic-school" required type="text"  name="school" value={input.school}
                                        placeholder="Your school" onChange={handleEdit} /> 
                                </Grid>
                                {/* Email */}
                                <Grid item xs={12} className="basic-sub-box">
                                    <label for="basic-email" className="basic-info-label">Email*</label>
                                    <input id="basic-email" required type="text"  name="email" value={input.email} 
                                        placeholder="Your email" onChange={handleEdit} /> 
                                </Grid>
                                {/* Phone Number */}
                                <Grid item xs={12} className="basic-sub-box">
                                <label for="basic-phone" className="basic-info-label">Phone</label>
                                    <input id="basic-phone" type="text"  name="phone" value={input.phone} 
                                        placeholder="(123)-456-7892" onChange={handleEdit} /> 
                                </Grid>
                                {/* Major(s) */}
                                <Grid item xs={12} sm={4}>
                                <label for="basic-major" className="basic-info-label basic-info-label--major" >Major(s)</label>
                                    <input id="basic-major" type="text"  name="major" value={input.major}
                                        placeholder="Your school major(s)" onChange={handleEdit}/>
                                </Grid>
                                {/* Class Year */}
                                <Grid item xs={12} sm={4}>
                                <label for="basic-class-year" className="basic-info-label">Class year</label>
                                <select id="basic-class-year" name="classYear" onChange={handleEdit}>
                                        <option value={input.classYear} label={input.classYear} selected></option>
                                        <option value="2019" label="2019"></option>
                                        <option value="2020" label="2020"></option>
                                        <option value="2021" label="2021"></option>
                                        <option value="2022" label="2022"></option>
                                        <option value="2023" label="2023"></option>
                                        <option value="2024" label="2024"></option>
                                        <option value="2025" label="2025"></option>
                                        <option value="2026" label="2026"></option>
                                </select>
                                {/* {years.map((option) => (
                                            <MenuItem value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))} */}
                                    
                                </Grid>
                                {/* Class Year */}
                                <Grid item xs={12} sm={4}>
                                <label for="basic-hub" className="basic-info-label">HUB number</label>
                                    <input id="basic-hub" type="text"  name="hub" value={input.hub}
                                        placeholder="Your Dickinson HUB number" onChange={handleEdit} maxlength = "4"/>
                                </Grid>
                            </Grid>
                        </section>
                        <section className="profile-security">
                            <h3>Security</h3>
                            <Grid container className="content">
                                {/* Password */}
                                    <label  className="security-label">Password</label>
                                    <a href="/password" id="security-password">
                                        <span><FontAwesomeIcon className="security-password-icon" icon={faUnlock}></FontAwesomeIcon>
                                        </span>Change password
                                    </a>  
                            </Grid>
                        </section>
                        <div className="edit-profile__bottom-illustration">
                            <img src={girl} alt="" className="edit-profile__bottom-illustration--image"/>
                        </div>
                        <div className="profile-end-buttons">
                            <Grid container className="content">
                                <Grid item xs={5} sm={6}>
                                    <a href="/account" className="edit-profile-btn edit-profile-btn--cancel">Cancel</a>
                                </Grid>
                                <Grid item xs sm={6}>  
                                    <div disabled={isEdited === false} type="submit" onClick={handleSubmit} className="edit-profile-btn edit-profile-btn--save">Save</div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </form>
                <ThemeProvider theme={defaultMaterialTheme}>
                    <Dialog open={open} disableBackdropClick="true" disableEscapeKeyDown="true">
                        <div className="edit-profile__loader">
                            <Loader
                                type= "BallTriangle" //"ThreeDots"//
                                color="#fff"
                                height={160}
                                width={160}
                                visible={open === true}
                            />
                        </div>                 
                    </Dialog>
                </ThemeProvider>
                <Snackbar open={isSubmitted === "submit-success"}
                            onClose={handleClose} 
                            autoHideDuration={4000}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                }}>
                    <ThemeProvider theme={defaultMaterialTheme}>
                        <Alert onClose={handleClose} severity="success">
                            Profile Updated Successfully!
                        </Alert>
                    </ThemeProvider>
                </Snackbar>

                <Snackbar open={emptyError}
                              autoHideDuration={4000}
                              onClose={handleClose}
                              anchorOrigin={{
                                  vertical: 'top',
                                  horizontal: 'center',
                              }}>
                        <ThemeProvider theme={defaultMaterialTheme}>
                            <Alert onClose={handleClose} severity="error">
                                Required Fields Missing!
                            </Alert>
                        </ThemeProvider>
                </Snackbar>
                <Snackbar open={isSubmitted === "submit-error"}
                            autoHideDuration={4000}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}>
                        <ThemeProvider theme={defaultMaterialTheme}>
                            <Alert onClose={handleClose} severity="error">
                                Error updating profile! Try again 
                            </Alert>
                        </ThemeProvider>
                </Snackbar>
            </div>
       </header>
     </CssBaseline>
    )
}