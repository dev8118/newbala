const express = require("express");
const path = require("path");
const multer = require("multer");
const router = express.Router();
const PostCtrl = require("../../ctrls/admin/PostCtrl");
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

router.get("/", PostCtrl.fetch);
router.get("/:id", PostCtrl.fetchById);
router.post(
  "/",
  uploader.fields([
    { name: "image", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  PostCtrl.create
);
router.put(
  "/:id",
  uploader.fields([
    { name: "image", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  PostCtrl.update
);
router.delete("/:id", PostCtrl.remove);

module.exports = router;
