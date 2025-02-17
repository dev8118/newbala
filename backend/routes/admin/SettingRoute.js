const express =require('express')
const router = express.Router()
const SettingCtrl = require('../../ctrls/admin/SettingCtrl');

router.get("/", SettingCtrl.fetch);
router.post('/', SettingCtrl.update);

module.exports = router;