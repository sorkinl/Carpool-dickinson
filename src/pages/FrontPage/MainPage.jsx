import React, { useRef } from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import Features from "./Features";
import firebase from "../../firebase/firebaseConfig";
import { Redirect } from "react-router-dom";

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop - 70);

const MainPage = () => {
  const myRef = useRef(null);
  const executeScroll = () => scrollToRef(myRef);
  var page;
  if (firebase.auth().currentUser) {
    page = <Redirect to="/dashboard" />;
  } else {
    page = (
      <>
        <Navbar />
        <Header executeScroll={executeScroll} />
        <Features refProp={myRef} />
      </>
    );
  }
  return page;
};

export default MainPage;
