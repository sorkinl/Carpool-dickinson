import React from 'react';
import {CssBaseline} from '@material-ui/core';
import ReactFullpage from '@fullpage/react-fullpage';
import "./frontPageFigma.css"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import logo from "../static/img/car.png"
import { Link } from 'react-router-dom';
import SearchBar from "../components/SearchResults/Searchbar"

const useStyles = makeStyles((theme) => ({
    button:{
        backgroundColor:"#FFFFFF",
        borderRadius:"50px",
        color:"#EF0001",
        fontSize:"30px",
        fontFamily: "Helvetica",
        fontWeight: "bold",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",

        paddingLeft:"25px",
        paddingRight:"25px",
        marginRight:"20px"
    }
}));

export default function FrontPageFigma(props) {
    const classes = useStyles();

    return(
    <CssBaseline>
        <div id ="fullpage">
        <ReactFullpage
            // licenseKey = {'YOUR_KEY_HERE'}
            scrollingSpeed = {500} /* Options here */

            render={({ state, fullpageApi }) => {
            return (
                
                <ReactFullpage.Wrapper>
                    <div className="section section1">
                        <div className = "title">
                            <img src = {logo} alt = "this" />
                            <div className = "Dpool">DPOOL</div>
                        </div>
                        <div className = "buttons">
                            <Button className = {classes.button}
                             color='primary'
                             variant='outlined'
                             onClick={() => fullpageApi.moveSectionDown()}>
                            Find a Ride</Button>

                            <Button className = {classes.button}
                            component={Link}
                            to='/postRide'
                            color='secondary'
                            variant='outlined'>
                            Offer a Ride</Button>
                        </div>

                    </div>

                    <div className="section section2">
                        <SearchBar/>
                

                </div>
                <div className="section">
                    <p>Section 3</p>
                </div>
                </ReactFullpage.Wrapper>
            );
            }}
        />
         </div>
  </CssBaseline>
    )
}

