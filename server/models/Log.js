var mongoose = require("mongoose");

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

// Log Schema
var logsSchema = new Schema({
  _id: ObjectId,
  RequestID: String,
  status: Number,
  method: String,
  URL: String,
  HTTPversion: String,
  date: String,
  Referrer: String
});

var Logs = (module.exports = mongoose.model("Logs", logsSchema));

// Get Logs
module.exports.getLogs = (callback, limit) => {
  Logs.find(callback).limit(limit);
};
