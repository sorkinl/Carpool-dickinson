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
      <img scr={svg} className="header__illustration--image"/>

    </div>

  </header>
);
}