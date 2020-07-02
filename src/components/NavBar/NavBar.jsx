import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import AccountIcon from "./AccountIcon";
import { toggleLogin } from "../../redux/actions/authActions";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "white",
    textDecoration: "none",
  },
  appBar: {
    zIndex: 3,
  },
}));


const NavBar = () => {
  const classes = useStyles();
  const auth = useSelector((state) => state.firebase.auth);
  const dispatch = useDispatch();

  const links = auth.uid ? (
    <AccountIcon />
  ) : (
    <>
      <Button
        component={Link}
        to="/logIn"
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        variant="outlined"
      >
        Log in
      </Button>
      <Button
        component={Link}
        to="/signUp"
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        variant="outlined"
      >
        Sign up
      </Button>
    </>
  );


  
  return (
    <div className={classes.root}>
  
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <DriveEtaIcon />
          </IconButton>
          <Link className={classes.title} to="/">
            Carpool
          </Link>
          {links}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
