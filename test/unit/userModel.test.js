const ObjectID = require("mongodb").ObjectID;

const database = require("../../util/database");
const User = require("../../models/user");

test("User constructor should set props correctly", () => {
  const user1 = new User(
    "5f9be35bdd3b1f017e4ebf99",
    "John Snow",
    "john@snow.com",
    "{'books': []}"
  );
  expect(user1._id).toBe("5f9be35bdd3b1f017e4ebf99");
  expect(user1.name).toBe("John Snow");
  expect(user1.email).toBe("john@snow.com");
  expect(user1.report).toBe("{'books': []}");
});

test("save() should execute correct insert if needed", () => {
  //
});
