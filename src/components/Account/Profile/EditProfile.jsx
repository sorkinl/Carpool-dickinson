import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import {
    Grid, 
    CssBaseline, 
    MenuItem,
    Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import firebase from '../../../firebase/firebaseConfig';
import {useFirestore} from "react-redux-firebase";
import {
    faChevronLeft,
    faUnlock
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import guy from '../../../assets/images/edit_profile.svg';
import girl  from '../../../assets/images/freelancer_blue.svg';
import { useEffect } from 'react';


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
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function EditProfile(props) {
    
    const user = useSelector(state => state.firebase.profile);
    const firestore = useFirestore();
    const currentUser = useSelector((state) => state.firebase.auth);
    const uid = currentUser.uid;
    
    const [isEdit, setEdit] = useState(false);
    const [isSubmit, setSubmit] = useState(false);
    
    console.log("auth id:", currentUser.uid);
    console.log("CURRENT USER", currentUser);
    
    const [input, setInput] = useState({
        firstName: "",
        lastName: "",
        school: "",
        email: "",
        phone: "",
        major: "",
        classYear: "",
        hub: ""
    });

    useEffect(() => {
        setInput({
            firstName: user.firstName,
        lastName: user.lastName,
        school: user.school,
        email: user.email,
        phone: user.phone,
        major: user.major,
        classYear: user.classYear,
        hub: user.hub
        })
    }, [user])
   
    console.log("user",user);

    function handleEdit(event) {
        const { name, value } = event.target;
        setInput((input) => ({ ...input, [name]: value }));
        setEdit(true);
    };
    
    function handleSubmit(e) {
        e.preventDefault(); //try remove
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
    console.log("input",input);
    return (
        <CssBaseline>
        <header className="account-page">
                <div className="edit-profile__top-illustration">
                    <img src={guy} alt="" className="edit-profile__top-illustration--image"/>
                </div>
                <div  className="edit-profile">
                <a href='/account' className="edit-profile-btn edit-profile-btn--back">
                    <span><FontAwesomeIcon className="edit-profile-icon" icon={faChevronLeft}></FontAwesomeIcon></span>
                    Back to account
                </a>
                <form onSubmit={handleSubmit}>
                    <div className="edit-profile-main">
                        <p className="edit-profile-title">Edit profile</p>
                        <hr></hr>
                        <section className="profile-basic-info">
                            <h3>Basic info</h3>
                            <Grid container className="content">
                                {/* First Name */}
                                <Grid item xs={6} sm={6} spacing={2}>
                                    <label for="basic-first-name" className="basic-info-label">First name*</label>
                                    <input id="basic-first-name" required type="text"  name="firstName" value={input.firstName} 
                                        placeholder="Your first name" onChange={handleEdit}/>
                                
                                        {/* defaultValue={input.firstName} */}
                                </Grid>
                                {/* Last Name */}
                                <Grid item xs={6} sm={6}>
                                <label for="basic-last-name" className="basic-info-label">Last name*</label>  
                                    <input id="basic-last-name" required type="text" name="lastName" value={input.lastName}
                                        placeholder="Your last name" onChange={handleEdit} /> 
                                </Grid>
                                {/* School */}
                                <Grid item xs={12} className="basic-sub-box">
                                    <label for="basic-school" className="basic-info-label">School*</label>
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
                                        placeholder="Your phone number" onChange={handleEdit} /> 
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
                                        <option value="19" label="2019"></option>
                                        <option value="20" label="2020"></option>
                                        <option value="21" label="2021"></option>
                                        <option value="22" label="2022"></option>
                                        <option value="23" label="2023"></option>
                                        <option value="24" label="2024"></option>
                                        <option value="25" label="2025"></option>
                                        <option value="26" label="2026"></option>
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
                                        placeholder="Your HUB number" onChange={handleEdit}/>
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
                                    <a href="" className="edit-profile-btn edit-profile-btn--cancel">Cancel</a>
                                </Grid>
                                <Grid item xs sm={6}>  
                                    <a href="" type="submit" className="edit-profile-btn edit-profile-btn--save">Save</a>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
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
       </header>
     </CssBaseline>
    )
}