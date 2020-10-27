const express = require("express");

const router = express.Router();

const libraryController = require("../controllers/library");

router.get("/", libraryController.getIndex);

router.get("/books", libraryController.getBooks);

router.get("/books/:bookId", libraryController.getBook);

// router.get("/report", libraryController.getReport);

// router.post("/report", libraryController.postReport);

module.exports = router;
