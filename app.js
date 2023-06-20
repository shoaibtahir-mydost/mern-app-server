const mongoose = require('mongoose');
const cors = require('cors');

mongoose
  .connect('mongodb://0.0.0.0:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database Connected'))
  .catch((err) => {
    console.log(err);
  });

const express = require('express');

const app = express();

app.use(cors());

const userRoute = require('./routes/userRoute');

app.use('/', userRoute);

app.listen(6010, () => {
  console.log('app is running');
});
