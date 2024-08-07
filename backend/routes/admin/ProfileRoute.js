const express = require('express');
const router = express.Router();
const ProfileCtrl = require('../../ctrls/admin/ProfileCtrl')

router.put('/update-profile/:id', ProfileCtrl.updateProfile)
router.put('/update-password/:id', ProfileCtrl.updatePassword)

module.exports = router;