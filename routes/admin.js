const path = require("path");

const express = require("express");

const rootDir = require("../util/path");

const router = express.Router();

router.get("/add-book", (req, res) => {
  res.sendFile(path.join(rootDir, "views", "add-book.html"));
});

router.post("/add-book", (req, res) => {
  res.redirect("/");
});

module.exports = router;
