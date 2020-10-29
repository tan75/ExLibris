const getDb = require("../util/database").getDb;
const mongoDb = require("mongodb");

const collectionName = "report";

class Report {
  constructor(bookId, pages) {
    this._id = id ? new mongoDb.ObjectID(id) : null;
    this.pages = pages;
  }

  save() {
    const db = getDb();
    let dbOp;
    dbOp = db.collection(collectionName).insertOne(this);

    return dbOp
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  }

  static fetchAll() {
    const db = getDb();

    return db
      .collection(collectionName)
      .find()
      .toArray()
      .then((books) => {
        return books;
      })
      .catch((err) => console.log(err));
  }

  static addBook(id, bookPages) {
    console.log(id, pages);
    //Fetch the previous report
    // Analyze the report => find existing books
    // Add new book or increase quantity of pages
    // Get total pages
  }

  static deleteBookById(id, bookPages) {
    //
  }

  static getReport(cb) {
    //
  }
}

module.exports = Report;
