import React from 'react'

import { useDispatch } from 'react-redux';
import {emailVerification} from '../../redux/actions/authActions';

export default function LandingPage() {

    const dispatch = useDispatch();


    function handleClick(e){''
      e.preventDefault();
      console.log("button clicked")
    //   if(user.password !== user.password2){
    //     console.log("password doesn't match!")
    //   }else{
    //     // dispatch actions
        dispatch(emailVerification())
    //   }
      
  }
    return(
        <div>
            <button onClick={handleClick}>Click to Verify email</button>
        </div>
    )
}