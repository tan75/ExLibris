const express = require("express");

const router = express.Router();

const libraryController = require("../controllers/library");

const errorController = require("../controllers/error");

router.get("/", libraryController.getIndex);

router.get("/books", libraryController.getBooks);

router.get("/books/:bookId", libraryController.getBook);

router.get("/report", libraryController.getReport);

router.post("/report", libraryController.postReport);

router.get("/500", errorController.getAppError);

module.exports = router;
