const express = require("express");
const { fetchCategories, createCategory } = require("../controller/Categories");
const router = express.Router();

router.get("/", fetchCategories).post("/", createCategory);

exports.router = router;
