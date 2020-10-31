const getDb = require("../util/database").getDb;
const mongoDb = require("mongodb");

const ObjectId = mongoDb.ObjectId;

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
      .findOne({ _id: new ObjectId(userId) })
      .then((user) => {
        return user;
      })
      .catch((err) => console.log(err));
  }

  addToReport(book) {
    // const reportBook = this.report.books.findIndex((rb) => {
    //   return (rb._id = book._id);
    // });

    const updatedReport = {
      books: [
        {
          bookId: new ObjectId(book._id),
          title: book.title,
          pages: book.pages,
        },
      ],
    };

    const db = getDb();
    return db.collection(collectionName).updateOne(
      {
        _id: new ObjectId(this._id),
      },
      { $set: { report: updatedReport } }
    );
  }
}

module.exports = User;
