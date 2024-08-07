const express = require("express");
const router = express.Router();
const FormCtrl = require("../ctrls/FormCtrl");
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

router.get('/setting', FormCtrl.getFormSetting);
router.post('/order',   
    uploader.fields([
        { name: "image", maxCount: 1 },
        { name: "gallery", maxCount: 10 },
    ]), FormCtrl.createRequest);
router.get('/order/:id', FormCtrl.getRequest);

module.exports = router;
