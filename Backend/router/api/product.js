const express = require("express");
const { product } = require("../../controller/product/productController");
const router = express.Router();

router.use("/", product);

module.exports = router;
