// EXTERNAL DEPENDENCIES
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const morgan = require("morgan");
const logger = require("mongo-morgan-ext");
const multer = require("multer");

// LOCAL DEPENDENCIES
const config = require("./server/config/database");
const users = require("./server/routes/users");
const sessions = require("./server/routes/sessions");
const logs = require("./server/routes/logs");

var app = express();
const production = true; // TODO CHANGE TO TRUE FOR PRODUCTION
var prod_port = process.env.PORT || 8080; // Port for Production Builds
var dev_port = 3000; // Port for Development

// SET STATIC FOLDER - Angular will compile to this folder using ng serve
app.use(express.static(path.join(__dirname, "public")));

// CORS MIDDLEWARE - Eliminates Proxying
app.use(cors());

// BODY PARSERPARSER
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());
require("./server/config/passport")(passport);

// CONNECT TO MONGOOSE
mongoose.connect(
  config.database,
  { useNewUrlParser: true }
);
mongoose.connection.on("connected", () => {
  console.log("Connected to Database: " + config.database);
});

// MONGOOSE ERROR HANDLING/ SHOWING
mongoose.connection.on("error", err => {
  console.log("Database Error: " + err);
});

// API ROUTING
app.use("/api/users", users);
app.use("/api/sessions", sessions);
app.use("/api/logs", logs);

// Send all other requests to the Angular app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "src/index.html"));
});

// Morgan for /logs endpoint
var db = "mongodb://dev:development1@ds115762.mlab.com:15762/rts-development";
var collection = "Logs";
var skipfunction = function(req, res) {
  return res.statusCode > 399;
}; //Thiw would skip if HTTP request response is less than 399 i.e no errors.
app.use(logger(db, collection, skipfunction)); //In your express-application

// Multer for multi-part forms
app.use(multer({ dest: "./uploads/" }).any("uploads"));
var storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-TEST");
  }
});
var upload = multer({ storage: storage });

// START SERVER
if (production) {
  app.listen(prod_port, () => {
    console.log("Productuin Build Running on Port: " + prod_port);
  });
} else {
  app.listen(dev_port, () => {
    console.log("Development Build Running on Port: " + dev_port);
  });
}
