const express = require("express");
const router = express.Router();
const PostCtrl = require("../ctrls/PostCtrl");

router.get("/:id", PostCtrl.fetchById);

module.exports = router;
