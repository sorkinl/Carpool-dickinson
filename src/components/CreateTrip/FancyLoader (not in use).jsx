import React, {useState} from 'react';
import Loader from 'react-loader-spinner';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faUserPlus,
  faHome,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import avatar from "../../static/img/avatar.png";
import {
  Popper,
  Fade,
  Paper,
 } from '@material-ui/core';

export default function FancyLoader(props) {
  const [active, setActive] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();

  const handleProfileOpen = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };
    return(
      <div>
         <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                <p>The content of the Popper.</p>
              </Paper>
            </Fade>
          )}
        </Popper>
        <div className="user-nav__user" >
              <img src={avatar} alt="" className="user-nav__user-photo" onClick={handleProfileOpen('bottom-end')}/>
              <span className="user-nav__user-name"></span>
          </div>
    </div>
    //  <Loader
    //     type="ThreeDots" //TailSpin
    //     color="#00BFFF"
    //     height={100}
    //     width={100}
      //   timeout={10000} //3 secs
    //  />
    );
    
}