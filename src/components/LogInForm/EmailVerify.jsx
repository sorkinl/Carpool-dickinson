import React from 'react'


const EmailVerified = () => {

    const verifyEmail = () => {
        firebase.auth().currentUser.sendEmailVerification()
    }
    return <div>
        <p>You need to verify your email before proceeding</p>
        <button onClick={verifyEmail}>Resend email verification</button>
    </div>
}


export default EmailVerified