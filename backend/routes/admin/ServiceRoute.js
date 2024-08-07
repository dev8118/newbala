const express = require("express");
const router = express.Router();
const ServiceCtrl = require("../../ctrls/admin/ServiceCtrl");

router.get("/", ServiceCtrl.fetch);
router.get("/:id", ServiceCtrl.fetchById);
router.post("/", ServiceCtrl.create);
router.put("/:id", ServiceCtrl.update);
router.delete("/:id", ServiceCtrl.remove);

module.exports = router;
