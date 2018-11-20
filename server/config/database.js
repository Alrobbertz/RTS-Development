module.exports = {
  database:
    "mongodb://dev:development1@ds115762.mlab.com:15762/rts-development",
  secret: "yoursecret",
  hrPool: {
    user: process.env.HR_USER,
    password: process.env.HR_PASSWORD,
    connectString: process.env.HR_CONNECTIONSTRING,
    poolMin: 10,
    poolMax: 10,
    poolIncrement: 0
  }
};
