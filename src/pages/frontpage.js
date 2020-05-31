import React from 'react';
import {CssBaseline} from '@material-ui/core';
import FrontSection from './frontSection';
export default function FrontPage(props) {
    return(
        <CssBaseline>
            <div>
                <FrontSection />
            </div>
        </CssBaseline>
    )
}