import React, {useState} from 'react';
import EditButton from './EditButton';
import EditField from './EditField';
import EditProfile from './EditProfile';
import unnamed from '../../../assets/images/unnamed.jpg';
import {
    makeStyles,
    Grid,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import {Link } from 'react-router-dom';

/* Display the profile basic info */
export default function Profile(props){
    const [isClicked, setClick] = useState(false);

    const user = useSelector(state => state.firebase.profile);
    // return(
    //     <div className={classes.root}>
    //         {/* Display user's Name, school, and Email*/}
    //         <Grid item>
    //             <Card className={classes.root} id="card">
    //                 <CardHeader
    //                     title={
    //                         <Typography className={classes.title} variant="h5">{user.firstName} {user.lastName}</Typography>
    //                     }
    //                     align='left'
    //                     subheader={
    //                         <>
    //                             <Typography variant="subtitle1" color="textPrimary">{user.school}</Typography>
    //                             <Typography variant="body2">{user.email}</Typography>
    //                         </>
    //                     }
    //                     avatar={
    //                         <img src={user.photoUrl}
    //                                 alt="/broken-image.jpg"
    //                                 className={classes.avatarSize}>
    //                         </img>
    //                     }
    //                 />
    //                 {/*Display the EditField if EditButton is clicked*/}
    //                 <CardActions>
    //                     <EditButton onClick={()=>{setClick(!isClicked)}} status={isClicked}/>
    //                 </CardActions>
    //                 {/* Expand Profile card and display EditField component*/}
    //                 <Collapse in={isClicked} timeout="auto" unmountOnExit>
    //                     <CardContent>
    //                         <EditField user={user}/>
    //                     </CardContent>
    //                 </Collapse>
    //             </Card>
    //         </Grid>
    //     </div>
    // );
    return (
        <div className="profile-card outer-div">
            <div className="profile-card inner-div">
                <div className="profile-card front">
                    {/* <div className="profile-card front__bkg-photo"></div> */}
                    <p className="section-name">Profile</p>
                    <img className ="profile-card front__face-photo" 
                        src={unnamed}
                        //src={user.photoUrl}
                        alt={unnamed}/>
                    
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
    )
}
