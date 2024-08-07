const express = require("express");
const router = express.Router();
const NavigationCtrl = require("../ctrls/NavigationCtrl")

router.get("/header", NavigationCtrl.fetchHeaderNavigations);
router.get("/footer", NavigationCtrl.fetchFooterNavigations);

module.exports = router;