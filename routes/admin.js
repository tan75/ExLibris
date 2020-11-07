const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const adminController = require("../controllers/admin");

// /admin/add-book => GET
router.get("/add-book", adminController.getAddBook);

router.get("/books", adminController.getBooks);

// /admin/add-book => POST
router.post(
  "/add-book",
  check("title")
    .isAlphanumeric()
    // .custom((value, { req }) => {
    //   console.log("33445 ", { req });
    //   console.log("33499 ", value);
    //   if (!value.match(/^[0-9a-z]+$/)) {
    //     throw new Error("Error Title should be string");
    //   }
    // })
    .withMessage("Please Enter Alphanumeric Characters Only"),
  check("imageUrl").isURL().withMessage("Please Enter Valid URL"),
  check("pages").isInt().withMessage("Please Enter Valid Number of Pages"),
  // .custom((value, { req }) => {
  //   if (typeof value !== "number") {
  //     throw new Error("Number of pages shoudl be number");
  //   }
  // }),
  adminController.postAddBook
);

router.get("/edit-book/:bookId", adminController.getEditBook);

router.post(
  "/edit-book",
  [
    check("title")
      //.isLength({ max: 50 })
      .isAlphanumeric()
      .withMessage("Please Enter Alphanumeric Characters Only"),
    check("imageUrl").isURL().withMessage("Please Enter Valid URL"),
    check("pages").isInt().withMessage("Please Enter Valid Number of Pages"),
  ],
  adminController.postEditBook
);

router.post("/delete-book", adminController.postDeleleBook);

module.exports = router;
