const express = require('express');
const user = express();
const multer = require('multer');

const path = require('path');
const bodyParser = require('body-parser');

user.use(bodyParser.urlencoded({ extended: true }));

user.use(express.static(path.resolve(__dirname, 'public')));

let storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './public/uploads');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

let upload = multer({ storage: storage });

const userController = require('../controllers/userController');

user.post('/importUser', upload.single('file'), userController.importUser);
user.get('/getAllUsers', userController.getUsers);

module.exports = user;
