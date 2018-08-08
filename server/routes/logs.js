const express = require("express");
const router = express.Router();

const Log = require("../models/Log");

router.get("*", function(req, res) {
  Log.getLogs(function(err, logs) {
    if (err) {
      throw err;
    }
    res.json(logs);
  });
});

module.exports = router;
