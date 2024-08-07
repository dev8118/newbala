const express = require('express');
const router = express.Router();
const FormCtrl = require('../../ctrls/admin/FormCtrl');
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "uploads/posts/");
    },
    filename: (req, file, callback) => {
      callback(null, Date.now() + path.extname(file.originalname));
    },
  });
  const uploader = multer({
    storage,
    limits: {
      fileSize: 256000000,
    },
  });

router.put('/update', uploader.fields([{ name: "image", maxCount: 1 }]), FormCtrl.updateFormSetting);
router.get('/orders', FormCtrl.getAllRequest);
router.put('/check-order/:id', FormCtrl.setStatus)
router.put('/details/:id', FormCtrl.setDetails)
router.delete('/order/:id', FormCtrl.deleteOrder)

module.exports = router;