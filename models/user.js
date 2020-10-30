const getDb = require("../util/database").getDb;
const mongoDb = require("mongoDb");

const collectionName = "users";

class User {
  contructor(name, email, report, id) {
    this.name = name;
    this.email = email;
    this.report = report; //{books: []}
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection(collectionName).insertOne(this);
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection(collectionName)
      .findOne({ _id: new mongoDb.ObjectID(userId) })
      .then((user) => {
        console.log("456 user ", user);
        return user;
      })
      .catch((err) => console.log(err));
  }

  addToReport(book) {
    const updatedReport = { books: { ...book, pages: 1 } };

    console.log("999 updated report ", updatedReport);
    const db = getDb();
    console.log("777 adding to report...", this._id);
    return db.collection(collectionName).updateOne(
      {
        _id: this._id,
      },
      { $set: { report: updatedReport } }
    );
    // return db.collection(collectionName).insertOne(this);
  }
}

module.exports = User;
