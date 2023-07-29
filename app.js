require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const DB = process.env.DATABASE;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const PORT = process.env.PORT || 5000;
require("./services/passport");
mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => {
    console.log(err);
  });

const path = require("path");

const app = express();

app.use(cors());

const userRoute = require("./routes/userRoute");

app.use(express.static(path.join(__dirname + "/public")));

app.use("/", userRoute);

require("./routes/userRoute")(app);

app.listen(PORT, () => {
  console.log("app is running");
});
