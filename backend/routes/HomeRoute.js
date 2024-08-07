const express = require("express");
const router = express.Router();
const HomeCtrl = require("../ctrls/HomeCtrl")

router.get("/", HomeCtrl.init);
router.get("/categories", HomeCtrl.fetchCategories);
router.get("/posts", HomeCtrl.fetchPostsByCategoryId);

module.exports = router;

