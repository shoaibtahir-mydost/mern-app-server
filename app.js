const mongoose = require("mongoose");
const cors = require("cors");

mongoose
  .connect(
    "mongodb://shoaibtahir97:BsBmNfEo0CqlUeK5@ac-5ltp2hw-shard-00-00.7qpftw6.mongodb.net:27017,ac-5ltp2hw-shard-00-01.7qpftw6.mongodb.net:27017,ac-5ltp2hw-shard-00-02.7qpftw6.mongodb.net:27017/?ssl=true&replicaSet=atlas-13di8i-shard-0&authSource=admin&retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
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
