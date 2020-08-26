import React from 'react';
import {CssBaseline} from '@material-ui/core';
import FrontSection from './frontSection';
import "./frontpage.css"

import fpone from "../static/img/frontpage1.jpg"
import fptwo from "../static/img/frontpage2.jpg"

import ReactFullpage from '@fullpage/react-fullpage';


export default function FrontPage(props) {
    return(
    <CssBaseline>
   <FrontSection/>
  </CssBaseline>
    )
}

