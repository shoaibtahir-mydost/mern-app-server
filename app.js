require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => {
    console.log(err);
  });

const express = require("express");

const path = require("path");

const app = express();

app.use(cors());

const userRoute = require("./routes/userRoute");

app.use(express.static(path.join(__dirname + "/public")));

app.use("/", userRoute);

const PORT = 6010;

app.listen(PORT, () => {
  console.log("app is running");
});
