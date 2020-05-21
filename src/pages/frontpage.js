import React, { useState } from 'react';
import {makeStyles, CssBaseline, Button, Avatar, Card, CardHeader, CardMedia, CardContent, CardActions, Typography, Box, Grid, Collapse} from '@material-ui/core';
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