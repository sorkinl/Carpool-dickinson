import React, {useState} from 'react';
import Loader from 'react-loader-spinner';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faUserPlus,
  faHome,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

export default function FancyLoader(props) {
  const [active, setActive] = useState(false);
    return(
     <Loader
        type="ThreeDots" //TailSpin
        color="#00BFFF"
        height={100}
        width={100}
      //   timeout={10000} //3 secs
     />
    );
}