import * as functions from "firebase-functions";

// Firebase HTTP felhőfüggvény (Spark-kompatibilis)
export const helloWorld = functions.https.onRequest((request, response) => {
  console.log("Hello logs!");
  response.send("Hello from Firebase (Spark)!");
});
