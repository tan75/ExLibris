const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
require('dotenv/config');  // to load variables from .env file

// Build connection string
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbUrl ="mongodb+srv://" + dbUser + ":" + dbPassword + dbHost;

let _db;
const mongoConnect = (callback) => {
  MongoClient.connect(dbUrl)
    .then((client) => {
      _db = client.db();
      console.log("Connected!");
      callback(client);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  } else {
    throw "No Database Found";
  }
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
