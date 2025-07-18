const express = require("express");
const Data = require("../models/post.model");
const { authCheck } = require("../middlewares/auth.middleware");
const { upload } = require("../middlewares/multer.middleware");
const { uploadOnCloudinary } = require("../utils/cloudinary");
const router = express.Router();

const fs = require("fs");
const path = require("path");

router.get("/userpost", async (req, res) => {
  try {
    const posts = await Data.find({}).populate("userId", "name bio");
    res.json({ data: posts });
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.post(
  "/userpost",
  authCheck,
  upload.single("media"),
  async (req, res) => {
    const { text = "" } = req.body;
    const file = req.file;
    console.log("req.file", req.file);

    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    try {
      const localFilePath = path.resolve(file.path); // ✅ convert to absolute path
      console.log("Resolved localFilePath:", localFilePath);

      const cloudinaryResponse = await uploadOnCloudinary(localFilePath);

      if (!cloudinaryResponse) {
        return res
          .status(500)
          .json({ success: false, message: "Cloudinary upload failed" });
      }

      // Delete the temp file only after upload
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }

      const createPost = await Data.create({
        userId: req.user._id,
        text: text || "",
        mediaUrl: cloudinaryResponse?.secure_url || "",
        mediaType: file?.mimetype || "",
      });

      res.json({ success: true, createPost });
    } catch (error) {
      console.error("Post creation error:", error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

module.exports = router;
