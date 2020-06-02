const functions = require('firebase-functions');
const admin = require('firebase-admin');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.createProfileCollection = functions.auth.user().onCreate(async (user) => {
    await admin.firestore().collection('users').add({
        firstName: user.firstName,
        lastName: user.lastName
    })
})
