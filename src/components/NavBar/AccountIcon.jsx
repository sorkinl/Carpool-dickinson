import React from "react"
import {IconButton, Menu, MenuItem} from '@material-ui/core/';
import {AccountCircle} from '@material-ui/icons/';
import { makeStyles, styled } from "@material-ui/core/styles";
import {  Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { red } from '@material-ui/core/colors';
import {logOut} from '../../redux/actions/authActions';

export default function AccountIcon() {
  const dispatch = useDispatch();

  // ------------ Menu Handlers ------------ //
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleLogOut(e) {
    e.preventDefault();
    dispatch(logOut());
  }

    const useStyles = makeStyles((theme) => ({
      accIcon: {
        top:'10px',
        right:'30px',
        position:'absolute',
        

      },


    }));
    const classes = useStyles();

    return (
    <div>
        <IconButton 
        className={classes.accIcon}
          aria-label="account of current user"
          //aria-controls="menu-appbar"
          aria-haspopup="true"
          style={{color: red[900], fontSize: 'large'}}
          onClick={handleMenu}
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
          <MenuItem onClick={handleLogOut} component={Link} to="/">Log Out</MenuItem>
          
        </Menu>
      </div>
    )
}
