const express = require("express");
const router = express.Router();
const ContactCtrl = require("../ctrls/ContactCtrl");

router.post("/", ContactCtrl.create);

module.exports = router;
