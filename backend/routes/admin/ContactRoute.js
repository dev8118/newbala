const express = require("express");
const router = express.Router();
const ContactCtrl = require("../../ctrls/admin/ContactCtrl");

router.get("/", ContactCtrl.fetch);
router.put("/:id", ContactCtrl.update);
router.post("/:id/send-email", ContactCtrl.sendEmail);
router.post("/:id/send-sms", ContactCtrl.sendSms);
router.delete("/:id", ContactCtrl.remove);

module.exports = router;
