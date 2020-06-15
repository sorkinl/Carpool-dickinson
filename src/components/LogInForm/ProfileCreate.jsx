import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Container from "@material-ui/core/Container";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { useSelector } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    position: "absolute",
    left: "50%",
  },
  form: {
    width: "100%", 
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  label: {
    backgroundColor: "white",
  },
}));

export default function ProfileCreate() {
  const classes = useStyles();

  const [user, setUser] = useState({
    school: "Dickinson College",
    major: "",
    classYear: "",
    hub: "",
    gender: "",
    phone: "",
  });
  const currentUser = useSelector((state) => state.firebase.auth.uid);
  const userProfile = useSelector((state) => state.firebase.profile);
  const firestore = useFirestore();

  function handleChange(e) {
    const { name, value } = e.target;

    setUser((user) => ({ ...user, [name]: value }));
  }
  function handleSelect(e) {
    setUser((user) => ({ ...user, [e.target.name]: e.target.value }));
  }
  function handleSubmit(e) {
    e.preventDefault();

    if (user.password !== user.password2) {
      console.log("password doesn't match!");
    } else {
      firestore.set(
        {
          collection: "users",
          doc: currentUser,
        },
        {
          ...user,
          status: 2,
        },
        { merge: true }
      );
    }
  }
  console.log("render");

  return userProfile.status === 2 ? (
    <Redirect to="/" />
  ) : (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {/* main form */}
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={user.school}
                id=""
                label="School"
                name="school"
                autoComplete="lname"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id=""
                label="Major"
                name="major"
                autoComplete="lname"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id=""
                label="Class year"
                name="classYear"
                autoComplete="lname"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id=""
                label="HUB Box number"
                name="hub"
                autoComplete="lname"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                fullWidth
              >
                <InputLabel className={classes.label} id="gender-label">
                  Gender
                </InputLabel>
                <Select
                  labelId="gender-label"
                  value={user.gender}
                  id="gender"
                  name="gender"
                  placeholder="Gender"
                  onChange={handleSelect}
                >
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id=""
                label="Phone Number"
                name="phone"
                autoComplete="lname"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}></Box>
    </Container>
  );
}
