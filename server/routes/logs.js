const express = require("express");
const router = express.Router();

const Log = require("../models/Log");

// Response handling
let response = {
  status: 200,
  data: [],
  message: "Endpoint is no Longer in Use."
};

router.get("/all", function(req, res) {
  Log.getLogs(function(err, logs) {
    if (err) {
      throw err;
    }
    res.json(logs); // Have to add mongo-morgan to use logs edpoint
  });
});

module.exports = router;
