const express = require("express");
const router = express.Router();
const auth = require("./auth");
const profile = require("./profile");
const product = require("./product");

router.use("/auth", auth);
router.use("/profile", profile);
router.use("/product", product);

module.exports = router;
