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

export const payload = functions.https.onRequest(async (request, response) => {
  let message;
  try {
    message = request.body.messages[0];
  } catch {
    functions.logger.info("Invalid payload!", { structuredData: true });
    response.status(400).send("Invalid payload");
    return;
  }
  functions.logger.info("Hello logs!", { structuredData: true });
  functions.logger.info(message, { structuredData: true });
  await admin
    .database()
    .ref("payloads/" + message.messageId)
    .set(message);
  response.send("Thank you");
});
