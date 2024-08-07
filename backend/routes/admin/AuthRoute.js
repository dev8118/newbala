const express = require("express");
const router = express.Router();
const AuthCtrl = require("../../ctrls/admin/AuthCtrl");

router.post("/login", AuthCtrl.login);
router.post("/forgot-password", AuthCtrl.forgotPassword);
router.post("/reset-password", AuthCtrl.resetPassword);
router.get("/me", AuthCtrl.me);

module.exports = router;
