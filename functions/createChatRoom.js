const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
exports.createChatRoom = functions.https.onRequest(
  async (request, response) => {
    cors(request, response, async () => {
      console.log(request.body);
      const tripDoc = await admin
        .firestore()
        .collection("trips")
        .doc(request.body.tripId)
        .get();
      const userDoc = await admin
        .firestore()
        .collection("users")
        .doc(request.body.uid)
        .get();
      admin
        .firestore()
        .collection("chatRooms")
        .doc(request.body.tripId)
        .set({
          members: [],
          messages: [],
          memberIds: [request.body.uid, tripDoc.data().uid],
          requests: {
            [request.body.uid]: {
              firstName: userDoc.data().firstName,
              lastName: userDoc.data().lastName,
              photoUrl: userDoc.data().photoUrl,
            },
          },
          trip: tripDoc.data(),
        });
    });
  }
);
