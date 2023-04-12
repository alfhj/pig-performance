import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript
/*
type SpanPayload = {
  messages: [
    {

    }
  ]
}
*/

admin.initializeApp();

export const payload = functions.region("europe-west1").https.onRequest(async (request, response) => {
  let message;
  let chipId;
  let movement;
  let timestamp;

  try {
    message = request.body.messages[0];
    const data = Buffer.from(message.payload, 'base64');
    chipId = data.readInt16LE(0);
    movement = data.readInt32LE(2);
    //timestamp = new Date(parseInt(message.received)).toISOString().split('.')[0] + "Z";
    timestamp = parseInt(message.received);
  } catch(error) {
    functions.logger.error("Invalid payload!");
    functions.logger.error(error);
    response.status(400).send("Invalid payload");
    return;
  }

  functions.logger.info("Logging message");
  functions.logger.info(message);
  await admin
    .database()
    .ref(`payloads/${message.messageId}`)
    .set(message);
  await admin
    .database()
    .ref(`activity_data/${chipId}/${timestamp}`)
    .set(movement);
  response.send("Thank you");
});
