const express = require("express");
const router = express.Router();
const HeaderNavigationCtrl = require("../../ctrls/admin/HeaderNavigationCtrl");

router.get("/", HeaderNavigationCtrl.fetch);
router.get("/:id", HeaderNavigationCtrl.fetchById);
router.post("/", HeaderNavigationCtrl.create);
router.put("/:id", HeaderNavigationCtrl.update);
router.delete("/:id", HeaderNavigationCtrl.remove);

module.exports = router;
