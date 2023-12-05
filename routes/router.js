const express = require("express");
const router = express.Router();

const produtoRouter = require("./produtos");

router.use("/", produtoRouter);

module.exports = router;