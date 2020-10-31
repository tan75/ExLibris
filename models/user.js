const getDb = require("../util/database").getDb;
const mongoDb = require("mongodb");

const collectionName = "users";

class User {
  constructor(id, name, email, report) {
    this._id = id;
    this.name = name;
    this.email = email;
    this.report = report || []; //{books: []}
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
    // const reportBook = this.report.books.findIndex((rb) => {
    //   return (rb._id = book._id);
    // });

    const updatedReport = { books: [{ ...book, pages: 1 }] };

    console.log("999 updated report ", updatedReport);
    const db = getDb();
    console.log("777 adding to report...", this);
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
