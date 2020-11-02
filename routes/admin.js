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
  check("title").isAlphanumeric(),
  adminController.postAddBook
);

router.get("/edit-book/:bookId", adminController.getEditBook);

router.post("/edit-book", adminController.postEditBook);

router.post("/delete-book", adminController.postDeleleBook);

module.exports = router;
