const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

const dbUrl =
  "mongodb+srv://libuser:libuser@exlibris.9bzwu.mongodb.net/<dbname>?retryWrites=true&w=majority";

const mongoConnect = (callback) => {
  MongoClient.connect(dbUrl)
    .then((client) => {
      console.log("Connected!");
      callback(client);
    })
    .catch((err) => console.log(err));
};

module.exports = mongoConnect;
