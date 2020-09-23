import React, { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
import logo from "../../assets/images/DPool_logo.png";
import icon from "../../assets/sprite.svg";
import avatar from "../../static/img/avatar.png";
import { Link } from "react-router-dom";
import {
  MenuItem,
  Menu,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
      },
      paper: {
        marginRight: theme.spacing(2),
      },
    overrides: {
        MuiPopover: {
            paper: {
                top: "10em",
                left: "151em",
                zIndex: 100,
            }
        }
    }
}));

const ProfilePopper = (props) => {
    const classes = useStyles();
  const user = useSelector(state => state.firebase.profile);
  const [anchorEl, setAnchorEl] =useState(null);
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
          <div  className="user-nav__user" onClick={handleClick}>
                <img src={avatar} alt="" className="user-nav__user-photo" />
                <span className="user-nav__user-name">{user.firstName}</span>
          </div>
          {/* <div className={classes.root}> */}
            <div anchorEl={anchorEl}>

            </div>
            <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>
                        <Link to="/account">My account</Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}><Link to="/account">My account</Link></MenuItem>
                </Menu>
            {/* </div> */}
    </div>
  );
};

export default ProfilePopper
