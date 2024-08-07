const express = require('express');
const  router = express.Router();
const FooterNavigationCtrl = require('../../ctrls/admin/FooterNavigationCtrl');

router.get("/", FooterNavigationCtrl.fetch);
router.get("/:id", FooterNavigationCtrl.fetchById)
router.post("/", FooterNavigationCtrl.create)
router.put("/:id", FooterNavigationCtrl.update)
router.delete("/:id", FooterNavigationCtrl.remove);

module.exports = router;