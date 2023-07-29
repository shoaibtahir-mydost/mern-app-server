const mongoose = require("mongoose");

const CSVSchema = new mongoose.Schema({
  "App NO": { type: String },
  "App Year": { type: String },
  "App Date": { type: String },
  "App Name": { type: String, unique: true },
  Institute: { type: String },
  "App Country": { type: String },
  "App City": { type: String },
  "Priority Date": { type: String },
  PriorityCountry: { type: String },
  "Priority Number": { type: String },
  "Publication Date": { type: String },
  "Publication Acceptance No": { type: String },
  Title: { type: String },
  IPC: { type: String },
  Abstract: { type: String },
  Status: { type: String },
});

module.exports = mongoose.model("csvs", CSVSchema);
