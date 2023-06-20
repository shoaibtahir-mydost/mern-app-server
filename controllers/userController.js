const users = require('../models/users');
const csv = require('csvtojson');

const importUser = (req, res) => {
  try {
    const userData = [];
    csv()
      .fromFile(req.file.path)
      .then(async (response) => {
        for (let i = 0; i < response.length; i++) {
          userData.push({
            id: response[i].ID,
            name: response[i].NAME,
            gender: response[i].GENDER,
            age: response[i].AGE,
            date: response[i].DATE,
            country: response[i].COUNTRY,
          });
        }
        await users.insertMany(userData);
      });
    res.send({
      status: 200,
      success: true,
      message: 'User saved successfully',
    });
  } catch (e) {
    res.send({ status: 400, success: false, msg: e.message });
  }
};

//Get All Users

const getUsers = async (req, res) => {
  const search = req.query.search || '';
  const query = {
    name: { $regex: search, $options: 'i' },
  };
  try {
    const userData = await users.find(query);
    res.status(200).json(userData);
  } catch (e) {
    res.status(401).json(e);
  }
};

module.exports = {
  importUser,
  getUsers,
};
