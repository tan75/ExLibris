const ObjectID = require("mongodb").ObjectID;

const database = require("../../util/database");
const Book = require("../../models/book");
const AppError = require("../../models/appError");

// we have to mock ./util/database functions all the way deep
// because they all get executed on save().. this is how that import looks like that we have to mock
// {
//    getDb: () => ({
//       collection: (name) => ({
//           updateOne: ... returns Promise
//           insertOne: ... returns Promise
//           ... the rest we don't care for now but may need for other tests
//       })
//    })
// }

const mockUpdateOne = jest.fn(() => ({
  then: jest.fn(() => ({ catch: jest.fn() })),
}));

const mockInsertOne = jest.fn(() => ({
  then: jest.fn(() => ({ catch: jest.fn() })),
}));

const mockDeleteOne = jest.fn(() => ({
  then: jest.fn(() => ({ catch: jest.fn() })),
}));

const mockFind = jest.fn(() => {
  return {
    toArray: jest.fn(() => ({
      then: jest.fn(() => ({
        catch: jest.fn(),
      })),
    })),
    next: jest.fn(() => {
      return {
        then: jest.fn(() => {
          return { catch: jest.fn() };
        }),
      };
    }),
  };
});

const mockCollection = jest.fn(() => ({
  updateOne: mockUpdateOne,
  insertOne: mockInsertOne,
  find: mockFind,
  deleteOne: mockDeleteOne,
}));

// mock the library
// more here https://jestjs.io/docs/en/mock-functions.html
jest.mock("../../util/database", () => ({
  getDb: jest.fn(() => {
    return {
      collection: mockCollection,
    };
  }),
}));

const imageUrl =
  "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fimages.hellogiggles.com%2Fuploads%2F2016%2F12%2F18043538%2Fshutterstock_91553819.jpg&f=1&nofb=1";

beforeEach(() => {
  // clear mock info before each test run
  jest.clearAllMocks();
});

test("Book constructor should set props correctly", () => {
  const book1 = new Book(
    "Title",
    155,
    "Description 1",
    imageUrl,
    null,
    "5f9be35bdd3b1f017e4ebf99"
  );
  expect(book1.title).toBe("Title");
  expect(book1.pages).toBe(155);
  expect(book1.description).toBe("Description 1");
  expect(book1.imageUrl).toBe(imageUrl);
  expect(book1._id).toBe(null);
  expect(book1.userId).toBe("5f9be35bdd3b1f017e4ebf99");
});

test("validate() should throw AppError", () => {
  const book2 = new Book(() => {}, 123123123, { lol: "wtf" }, [], -1, [[]]);
  let error;
  try {
    book2.validate();
  } catch (e) {
    error = e;
  }
  expect(error).toBeInstanceOf(AppError);
});

test("save() should execute correct insert if needed", () => {
  const book1 = new Book(
    "Title",
    155,
    "Description 1",
    imageUrl,
    null,
    "5f9be35bdd3b1f017e4ebf99"
  );

  book1.save();

  expect(database.getDb).toHaveBeenCalled();
  expect(mockCollection).toHaveBeenCalledWith("books");
  expect(mockInsertOne).toHaveBeenCalledWith(book1);
});

test("save() should execute correct update if needed", () => {
  const book1 = new Book(
    "Title",
    155,
    "Description 1",
    "test",
    "83e0ed3570b042e3aee48a75",
    "5f9be35bdd3b1f017e4ebf99"
  );

  book1.save1();
  expect(database.getDb).toHaveBeenCalled();
  expect(mockCollection).toHaveBeenCalledWith("books");
  expect(mockUpdateOne).toHaveBeenCalledWith(
    { _id: new ObjectID("83e0ed3570b042e3aee48a75") },
    { $set: book1 }
  );
});

test("fetchAll() should execute correct find if needed", () => {
  Book.fetchAll();
  expect(database.getDb).toHaveBeenCalled();
  expect(mockCollection).toHaveBeenCalledWith("books");
  expect(mockFind).toHaveBeenCalled();
});

test("findById() should execute correct find if needed", () => {
  const book1 = new Book(
    "Title",
    155,
    "Description 1",
    "test",
    "83e0ed3570b042e3aee48a75",
    "5f9be35bdd3b1f017e4ebf99"
  );

  Book.findById(book1._id);
  expect(database.getDb).toHaveBeenCalled();
  expect(mockCollection).toHaveBeenCalledWith("books");
  expect(mockFind).toHaveBeenCalledWith({
    _id: new ObjectID("83e0ed3570b042e3aee48a75"),
  });
});

test("deleteById() should execute correct deleteOne if needed", () => {
  const book1 = new Book(
    "Title",
    155,
    "Description 1",
    "test",
    "83e0ed3570b042e3aee48a75",
    "5f9be35bdd3b1f017e4ebf99"
  );

  Book.deleteById(book1._id);
  expect(database.getDb).toHaveBeenCalled();
  expect(mockCollection).toHaveBeenCalledWith("books");
  expect(mockDeleteOne).toHaveBeenCalledWith({
    _id: new ObjectID("83e0ed3570b042e3aee48a75"),
  });
});
