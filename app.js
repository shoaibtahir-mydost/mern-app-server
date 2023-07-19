const mongoose = require("mongoose");
const cors = require("cors");

mongoose
  .connect("mongodb://0.0.0.0:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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

const PORT = process.env.PORT || 6010;

app.listen(PORT, () => {
  console.log("app is running");
});
