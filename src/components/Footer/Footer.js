import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { AppBar,Toolbar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    footer: {
        top: 'auto',
        height:20,
        bottom: 0,
        position:"relative"
      },
}));

export default function MenuAppBar() {
    const classes = useStyles();

  return (
    <div>
    
      {/* <AppBar classes = {{root:classes.footer}}>
          <Toolbar>
              dasdas
          </Toolbar>
        
      </AppBar> */}
    </div>
  );
}
