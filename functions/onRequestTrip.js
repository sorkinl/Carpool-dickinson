const functions = require("firebase-functions");
const admin = require("firebase-admin");
/* const mailgun = require("mailgun-js")({
  apiKey: functions.config().mailgun.apikey,
  domain: functions.config().mailgun.domain,
}); */
const nodemailer = require("nodemailer");
exports.onRequestTrip = functions.firestore
  .document("trips/{tripId}/members/{memberId}")
  .onCreate(async (snapshot, context) => {
    const requestData = snapshot.data();

    const tripOwner = await admin
      .firestore()
      .collection("users")
      .doc(requestData.ownerId)
      .get();

    const mailTransport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: functions.config().gmail.email,
        pass: /* functions.config().gmail.pw */ "bwsejmczlftgiqmz",
      },
    });
    console.log(tripOwner, requestData);
    const mailOptions = {
      from: "carpooldickinson@gmail.com",
      to: tripOwner.data().email,
      subject:
        /* 
        "Trip request from " +
        requestData.firstName +
        " " +
        requestData.lastName, */ "Hi",
      text: requestData.message,
    };

    return /* mailgun.messages().send */ mailTransport.sendMail(
      mailOptions,
      function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent");
        }
      }
    );
  });
