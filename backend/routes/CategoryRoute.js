const express = require("express");
const router = express.Router();
const CategoryCtrl = require("../ctrls/CategoryCtrl");

router.get('/:id', CategoryCtrl.init);

module.exports = router;
