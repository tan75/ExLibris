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
    .withMessage("Please Enter Alphanumeric Characters Only"),
  check("imageUrl").isURL().withMessage("Please Enter Valid Email"),
  check("pages").isInt().withMessage("Please Enter Valid Number of Pages"),
  check("description")
    .isAlphanumeric()
    .withMessage("Please Enter Valid Description"),
  adminController.postAddBook
);

router.get("/edit-book/:bookId", adminController.getEditBook);

router.post("/edit-book", adminController.postEditBook);

router.post("/delete-book", adminController.postDeleleBook);

module.exports = router;
