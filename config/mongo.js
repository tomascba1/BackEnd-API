require("dotenv").config()

const mongoose = require("mongoose");
const URI = process.env.MONGO_KEY

mongoose.connect(URI, (err) => {
  err ? console.log("\033[31m " + err) : console.log("\033[32m  'Mongo Atlas connected ok'");
});