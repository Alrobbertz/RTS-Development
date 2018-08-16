var mongoose = require("mongoose");
const path = require("path");
var PythonShell = require("python-shell");

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

// Session Schema
var sessionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  record_date: {
    type: String,
    required: true
  },
  session_type: {
    type: String,
    required: true
  },
  ts: [String],
  force_raw: [Number],
  angle_raw: [Number],
  force_adj: [Number],
  angle_adj: [Number]
});

var Session = (module.exports = mongoose.model("Session", sessionSchema));

// ------------------ Handle Routing ----------------------

// Get Sessions
module.exports.getSessions = (callback, limit) => {
  Session.find(callback);
};

module.exports.getSessionById = function(session_id, callback) {
  Session.findById(session_id, callback);
};

// Add Session
module.exports.addSession = (session, callback) => {
  Session.create(session, callback);
};

// Upload Session
module.exports.uploadSession = function(session, filename, callback) {
  var myPythonScriptPath = path.join(__dirname, "../python");
  var options = {
    mode: "text",
    scriptPath: myPythonScriptPath,
    args: [session.name, session.session_type, filename]
  };

  PythonShell.run("script.py", options, function(err, results) {
    if (err) throw err;
    // results is an array consisting of messages collected during execution
    console.log("results: %j", results);
  });
};

// Update Session
module.exports.updateSession = function(id, session, options, callback) {
  var query = { _id: id };
  var update = {
    name: session.name,
    record_date: session.record_date,
    session_type: session.session_type
  };

  if (session.ts) {
    update.ts = session.ts;
  }
  if (session.force_raw) {
    update.force_raw = session.force_raw;
  }
  if (session.force_adj) {
    update.force_adj = session.force_adj;
  }
  if (session.angle_raw) {
    update.angle_raw = session.angle_raw;
  }
  if (session.angle_adj) {
    update.angle_adj = session.angle_adj;
  }

  Session.findOneAndUpdate(query, update, options, callback);
};

// Delete Session
module.exports.deleteSession = (id, callback) => {
  var query = { _id: id };
  Session.remove(query, callback);
};
