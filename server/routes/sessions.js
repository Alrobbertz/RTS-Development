const express = require("express");
const router = express.Router();

const Session = require("../models/Session");

// Error handling
const sendError = (err, res) => {
  response.status = 501;
  response.message = typeof err == "object" ? err.message : err;
  res.status(501).json(response);
};

// Response handling
let response = {
  status: 200,
  data: [],
  message: null
};

// Get all Sessions
router.get("/all", function(req, res) {
  Session.getSessions(function(err, sessions) {
    if (err) {
      throw err;
    }
    res.json(sessions);
  });
});

// Get Session by ID
router.get("/details/:_id", function(req, res) {
  Session.getSessionById(req.params._id, function(err, session) {
    if (err) {
      throw err;
    }
    res.json(session);
  });
});

// Create a new Session
router.post("/new", function(req, res) {
  var session = req.body;
  Session.addSession(session, function(err, session) {
    if (err) {
      throw err;
    }
    res.json(session);
  });
});

// UPLOAD NEW SESSION
router.post("/upload", function(req, res) {
  if (!req.files) {
    console.log("No file received");
    return res.send({ success: false });
  } else {
    console.log("File Received!");
    //console.log(req.files[0]);
    var session = req.body;
    var filename = req.files[0].filename;
    Session.uploadSession(session, filename);
    return res.send({ success: true });
  }
});

// Update Session
router.put("/update/:_id", function(req, res) {
  console.log(req.body);
  var id = req.params._id;
  var session = req.body;
  Session.updateSession(id, session, {}, function(err, session) {
    if (err) {
      throw err;
    }
    res.json(session);
  });
});

router.delete("/delete/:_id", function(req, res) {
  var id = req.params._id;
  Session.deleteSession(id, function(err, session) {
    if (err) {
      throw err;
    }
    res.json(session);
  });
});

module.exports = router;
