const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

var argv = require("yargs/yargs")(process.argv.slice(2)).argv;

// Build connection string
const dbUser = argv._[0];
const dbPassword = argv._[1];

const dbUrl =
  "mongodb+srv://" +
  dbUser +
  ":" +
  dbPassword +
  "@exlibris.9bzwu.mongodb.net/exlibris?retryWrites=true&w=majority";

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
