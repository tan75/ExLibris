const express = require("express");

const router = express.Router();

const libraryController = require("../controllers/library");

router.get("/", libraryController.getIndex);

router.get("/books", libraryController.getBooks);

router.get("/report", libraryController.getReport);

module.exports = router;
