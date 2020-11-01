const getDb = require("../util/database").getDb;
const mongoDb = require("mongodb");

const ObjectId = mongoDb.ObjectId;

// Collections
const userCollectionName = "users";
const booksCollectionName = "books";

class User {
  constructor(id, name, email, report) {
    this._id = id;
    this.name = name;
    this.email = email;
    this.report = report || []; //{books: []}
  }

  save() {
    const db = getDb();
    return db.collection(userCollectionName).insertOne(this);
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection(userCollectionName)
      .findOne({ _id: new ObjectId(userId) })
      .then((user) => {
        return user;
      })
      .catch((err) => console.log(err));
  }

  getReport() {
    const db = getDb();
    const bookIds = this.report.books.map((i) => {
      return i.bookId;
    });

    return db
      .collection(booksCollectionName)
      .find({ _id: { $in: bookIds } })
      .toArray()
      .then((books) => {
        return books.map((b) => {
          return {
            ...b,
            pages: this.report.books.find((i) => {
              return i.bookId.toString() === b._id.toString();
            }).pages,
          };
        });
      });
  }

  addToReport(book) {
    const reportBookIndex = this.report.books.findIndex((rb) => {
      return rb.bookId.toString() === book._id.toString();
    });

    let newPages = 0;
    const updatedReportBooks = [...this.report.books];

    // Check the if a book already exists
    // and add pages
    if (reportBookIndex >= 0) {
      newPages =
        Math.floor(this.report.books[reportBookIndex].pages) +
        Math.floor(this.report.books[reportBookIndex].pages);
      updatedReportBooks[reportBookIndex].pages = newPages;
    } else {
      updatedReportBooks.push({
        bookId: new ObjectId(book._id),
        title: book.title,
        pages: +book.pages,
      });
    }

    const updatedReport = {
      books: updatedReportBooks,
    };

    const db = getDb();
    return db.collection(userCollectionName).updateOne(
      {
        _id: new ObjectId(this._id),
      },
      { $set: { report: updatedReport } }
    );
  } // end addToReport
}

module.exports = User;
