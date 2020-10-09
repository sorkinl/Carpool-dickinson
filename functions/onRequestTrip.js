const functions = require("firebase-functions");
const admin = require("firebase-admin");
const mailgun = require("mailgun-js")({
  apiKey: functions.config().mailgun.apikey,
  domain: functions.config().mailgun.domain,
});
/* const nodemailer = require("nodemailer"); */
exports.onRequestTrip = functions.firestore
  .document("trips/{tripId}/members/{memberId}")
  .onCreate(async (snapshot, context) => {
    const requestData = snapshot.data();

    const tripOwner = await admin
      .firestore()
      .collection("users")
      .doc(requestData.ownerId)
      .get();

    const mailOptions = {
      from: "lsorkini@gmail.com",
      to: /* tripOwner.data().email */ "lsorkini@gmail.com",
      subject:
        "Trip request from " +
        requestData.firstName +
        " " +
        requestData.lastName,
      text: requestData.message,
    };

    return mailgun.messages().send(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent");
      }
    });
  });
