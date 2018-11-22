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
const oracledb = require('oracledb');

// LOCAL DEPENDENCIES
const dbConfig = require("./server/config/database");
const users = require("./server/routes/users");
const sessions = require("./server/routes/sessions");
const logs = require("./server/routes/logs");
const database = require("./server/services/database")

var app = express();
const production = false; // TODO CHANGE TO TRUE FOR PRODUCTION
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
  dbConfig.database,
  { useNewUrlParser: true }
);
mongoose.connection.on("connected", () => {
  console.log("Connected to Database: " + dbConfig.database);
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
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Morgan for /logs endpoint
// Combines Logging info from request and response. 
app.use(morgan('combined'));
var db = "mongodb://dev:development1@ds115762.mlab.com:15762/rts-development";
var collection = "Logs";
var skipfunction = function (req, res) {
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

// Start the Server
start()

async function start() {
  // // Connect to Oracle RDS
  // try {
  //   console.log('Initializing database module');

  //   await database.initialize();
  // } catch (err) {
  //   console.error(err);

  //   process.exit(1); // Non-zero failure code
  // }

  // *** existing try block in startup here ***

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
}

async function getEmployee(empId) {
  let conn;

  try {
    conn = await oracledb.getConnection(config);

    const result = await conn.execute(
      'select * from employees where employee_id = :id',
      [empId]
    );

    console.log(result.rows[0]);
  } catch (err) {
    console.log('Ouch!', err);
  } finally {
    if (conn) { // conn assignment worked, need to close
      console.log("We Still Have an Oracle Connection!!")
      await conn.close();
    }
  }
}


