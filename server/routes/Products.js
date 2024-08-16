const express = require("express");
const {
  createProduct,
  fetchAllProductsByFilter,
  fetchProductById,
  updateProductById,
} = require("../controller/Product");
const router = express.Router();

router
  .post("/", createProduct)
  .get("/", fetchAllProductsByFilter)
  .get("/:id", fetchProductById)
  .patch("/:id", updateProductById);

exports.router = router;
