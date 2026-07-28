const express = require("express");
const { loginUser } = require("../../controller/auth/loginUser");
const router = express.Router();

router.use("/", loginUser);

module.exports = router;
