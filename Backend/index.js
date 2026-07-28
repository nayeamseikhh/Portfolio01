const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./router");
app.use(cors());
app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port also this is my port`);
});
