const mongodb = require("mongodb");
const { get } = require("../routes/admin");

const MongoClient = mongodb.MongoClient;

const dbUrl =
  "mongodb+srv://libuser:libuser@exlibris.9bzwu.mongodb.net/exlibris?retryWrites=true&w=majority";

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
  if (_db) return _db;
  else throw "No Database Found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
