const express = require("express");
const app = express();
const mongodb = require("mongodb");
const { MongoClient } = mongodb;
const asyncHandler = require("express-async-handler");
const cors = require("cors");

const uri = "mongodb+srv://boukhrisamine:mino2007@aminecluster.xtawsm6.mongodb.net/";
const databaseName = "newsteller";
const collectionName = "subscribers_emails";

let client;

async function connectToMongoDB() {
  try {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    console.log("Connected to database successfully.");
  } catch (error) {
    console.log("error connection to database:", error);
    throw error;
  }
}

connectToMongoDB();

const port = 3000;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.post(
  "/subscribe",
  asyncHandler(async (req, res) => {
    const collection = client.db(databaseName).collection(collectionName);
    const data = req.body;
    const emailExist = await collection.findOne({ email: data.email });
    if (emailExist) {
      res.status(409);
      throw new Error("email already subscribed.");
    }
    await collection.insertOne(data);
    res.send("Email data inserted successfully.");
  })
);

app.listen(port, () => {
  console.log("listening on port:", port);
});