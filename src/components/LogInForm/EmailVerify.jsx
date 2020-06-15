import React from 'react'
import firebase from '../../firebase/firebaseConfig'

const EmailVerify = () => {

    const verifyEmail = () => {
        firebase.auth().currentUser.sendEmailVerification()
    }
    return <div>
        <p>You need to verify your email before proceeding</p>
        <button onClick={verifyEmail}>Resend email verification</button>
    </div>
}


export default EmailVerify