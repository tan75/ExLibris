const ObjectID = require("mongodb").ObjectID;

const database = require("../../util/database");
const User = require("../../models/user");
const expectExport = require("expect");

// Mocks
const mockInsertOne = jest.fn(() => ({
  then: jest.fn(() => ({ catch: jest.fn() })),
}));

const mockFindOne = jest.fn(() => ({
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
  insertOne: mockInsertOne,
  findOne: mockFindOne,
  find: mockFind,
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

// End Mocks

beforeEach(() => {
  // clear mock info before each test run
  jest.clearAllMocks();
});

test("User constructor should set props correctly", () => {
  const user1 = new User(
    "5f9be35bdd3b1f017e4ebf99",
    "John Snow",
    "john@snow.com",
    { books: [[Object], [Object], [Object]], totalPages: 8255 }
  );
  expect(user1._id).toBe("5f9be35bdd3b1f017e4ebf99");
  expect(user1.name).toBe("John Snow");
  expect(user1.email).toBe("john@snow.com");
  expect(user1.report).toEqual({
    books: [[Object], [Object], [Object]],
    totalPages: 8255,
  });
});

test("save() should execute correct insert if needed", () => {
  const user1 = new User(
    "5f9be35bdd3b1f017e4ebf99",
    "John Snow",
    "john@snow.com",
    { books: [[Object], [Object], [Object]], totalPages: 8255 }
  );

  user1.save();
  expect(database.getDb).toHaveBeenCalled();
  expect(mockCollection).toHaveBeenCalledWith("users");
  expect(mockInsertOne).toBeCalledWith(user1);
});

test("findById(userId) should execute correct findOne if needed", () => {
  const user1 = new User(
    "5f9be35bdd3b1f017e4ebf99",
    "John Snow",
    "john@snow.com",
    { books: [[Object], [Object], [Object]], totalPages: 8255 }
  );
  User.findById(user1._id);
  expect(database.getDb).toHaveBeenCalled();
  expect(mockCollection).toHaveBeenCalledWith("users");
  expect(mockFindOne).toBeCalledWith({
    _id: new ObjectID("5f9be35bdd3b1f017e4ebf99"),
  });
});

test("getReport() should execute correct find if needed", () => {
  const user1 = new User(
    "5f9be35bdd3b1f017e4ebf99",
    "John Snow",
    "john@snow.com",
    { books: [[Object], [Object], [Object]], totalPages: 8255 }
  );

  // TODO
});
