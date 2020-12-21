const express = require("express");

const router = express.Router();

const libraryController = require("../controllers/library");

const errorController = require("../controllers/error");

router.get("/api/", libraryController.getIndex);

router.get("/api/books", libraryController.getBooks);

router.get("/api/books/:bookId", libraryController.getBook);

router.get("/api/report", libraryController.getReport);

router.post("/api/report", libraryController.postReport);

router.get("/500", errorController.getAppError);

module.exports = router;
