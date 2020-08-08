import React, { useState } from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import svg from "../../assets/images/park.svg";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { signIn } from "../../redux/actions/authActions";
import { register } from "../../redux/actions/authActions";



export default function SignUpSignIn() {
  const errorMessage = useSelector((state) => state.authReducer.errorMessage);
  const userReady = useSelector((state) => state.firebase.auth);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
  });

  const dispatch = useDispatch();

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  }

  function handleSubmitLogin(e) {
    e.preventDefault();
    dispatch(signIn({ email: user.email, password: user.password }));
  }

  function handleSubmitSignup(e) {
    "";
    e.preventDefault();

    if (user.password !== user.password2) {
      console.log("password doesn't match!");
    } else {
      dispatch(register(user));
    }
  }

  return isLoaded(userReady) && !isEmpty(userReady) ? (
    <Redirect to="/" />
  ) : (
  <header className="signUp">
    <div className="signUp rectangle">
    <div className="signUp__pic">
          <img src={svg} alt="" className="signUp__pic--illustration" />
        </div>
        <div >
        <Tabs selectedTabClassName="signUp is-selected" className="signUp tabs" >
        <TabList>
           <Tab className="signUp tab">Log In</Tab>
           <Tab className="signUp tab">Sign Up</Tab>
      </TabList>

      <TabPanel>
       <form className="signUp login-form" noValidate> 
        <input onChange={handleChange} id="email" autoComplete="email" name="email" class="signUp input--login" type="text" placeholder="Email" required />
        <input type="password" id="password" autoComplete="current-password" name="password" class="signUp input--login"  placeholder="Password"  onChange={handleChange} required />
        <a onClick={handleSubmitLogin} className="btn btn--signUp">Log in</a>
        <div className="red-text">
            {errorMessage ? (
              <p style={{ color: "red" }}>{errorMessage}</p>
            ) : null}
          </div>
       </form>

      </TabPanel>
      <TabPanel>
        <form  className="signUp login-form"> 
        <input onChange={handleChange} class="signUp input" type="text" name="firstName" placeholder="First Name" autoComplete='fname' required />
        <input onChange={handleChange} class="signUp input" type="text" name="lastName" placeholder="Last Name" autoComplete="lname" required />
        <input onChange={handleChange} class="signUp input" type="text" name="email" placeholder="Email" autoComplete="email" required />
        <input onChange={handleChange} class="signUp input" type="password" name="password" placeholder="Password" autoComplete="off"  required />
        <input onChange={handleChange} class="signUp input" type="password" name="password2" placeholder="Confirm Password" autoComplete="off" required />
        <a className="btn btn--signUp" onClick={handleSubmitSignup}>Sign up</a>

        </form>
      </TabPanel>

      {/* <div className="fields">
    <input placeholder="First Name" type="text" className="signUp input"></input>
    </div> */}
    </Tabs>
    </div>
    </div>
  </header>
);
}