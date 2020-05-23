import React from "react"
import {IconButton, Menu, MenuItem} from '@material-ui/core/';
import {AccountCircle} from '@material-ui/icons/';

import {  Link } from "react-router-dom";

export default function AccountIcon() {
  // set the position of the menu
    const [anchorEl, setAnchorEl] = React.useState(null);
    //construct a boolean out of the above state. If value is Boolean() is equals to null, NaN or undefined, returns false.
    const open = Boolean(anchorEl);
    //Two functions to handle menu. Set anchorEl to the position of the menu.
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
    <div>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        
        
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={handleClose}
        >

          <MenuItem onClick={handleClose} component={Link} to="/account">Account</MenuItem>
          <MenuItem onClick={handleClose} component={Link} to="/chat">Chat</MenuItem>
          
        </Menu>
      </div>
    )
}