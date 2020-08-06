import React, { useState } from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import svg from "../../assets/images/park.svg";


export default function SignUpSignIn() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    password: "",
    password2: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  }

  function handleSubmit(e) {
    "";
    e.preventDefault();
    console.log("button clicked");
  }

return(
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
       <form className="signUp login-form"> 
        <input class="signUp input" type="text" placeholder="Email" autocomplete="off" required />
        <input class="signUp input" type="text" placeholder="Password" autocomplete="off" required />
       </form>
      </TabPanel>
      <TabPanel>
        <form  className="signUp login-form"> 
        <input class="signUp input" type="text" placeholder="First Name" autocomplete="off" required />
        <input class="signUp input" type="text" placeholder="Last Name" autocomplete="off" required />
        <input class="signUp input" type="text" placeholder="Password" autocomplete="off" required />
        <input class="signUp input" type="text" placeholder="Confirm Password" autocomplete="off" required />
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