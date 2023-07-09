const users = require("../models/users");
const csv = require("csvtojson");
const fs = require("fs");
const { promisify } = require("util");

const unlinkAsync = promisify(fs.unlink);

exports.importUser = (req, res) => {
  try {
    const userData = [];
    csv()
      .fromFile(req.file.path)
      .then(async (response) => {
        for (let i = 0; i < response.length; i++) {
          userData.push({
            "App NO": response[i]["App NO"],
            "App Year": response[i]["App Year"],
            "App Date": response[i]["App Date"],
            "App Name": response[i]["App Name"],
            Institute: response[i].Institute,
            "App Country": response[i]["App Country"],
            "App City": response[i]["App City"],
            "Priority Date": response[i]["Priority Date"],
            PriorityCountry: response[i]["PriorityCountry"],
            "Priority Number": response[i]["Priority Number"],
            "Publication Date": response[i]["Publication Date"],
            "Publication Acceptance No":
              response[i]["Publication Acceptance No"],
            Title: response[i].Title,
            IPC: response[i].IPC,
            Abstract: response[i].Abstract,
            Status: response[i].Status,
          });
        }
        await users.deleteMany({});
        await users.insertMany(userData);
        await unlinkAsync(req.file.path);
      });
    res.send({
      status: 200,
      success: true,
      message: "User saved successfully",
    });
  } catch (e) {
    res.send({ status: 400, success: false, msg: e.message });
  }
};

//Get All Users with search params

exports.getUsers = async (req, res) => {
  const appNumber = req.query.appNumber || "";
  const appYear = req.query.appYear || "";
  const appName = req.query.appName || "";
  const title = req.query.title || "";
  const abstract = req.query.abstract || "";

  console.log(req.query);
  let query = {
    ["App Name"]: { $regex: appName, $options: "i" },
  };

  if (appNumber !== "") {
    query = { ["App NO"]: appNumber, ["App Year"]: appYear };
  }

  if (title !== "") {
    query["Title"] = { $regex: title, $options: "i" };
  }
  if (abstract !== "") {
    query["Abstract"] = { $regex: abstract, $options: "i" };
  }

  try {
    const userData = await users.find(query);
    res.status(200).json(userData);
  } catch (e) {
    res.status(401).json(e);
  }
};
