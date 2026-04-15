const mongoose = require("mongoose");

const DB_URL = process.env.DATABASE;

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Mongo db connection established sucessfully ...");
  })
  .catch((err) => {
    console.log(`Error in establishing connection ${err}`);
  });

  