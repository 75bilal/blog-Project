const userpost = require("../models/post.model");

const { uploadOnCloudinary } = require("../utils/cloudinary");


const fs = require("fs");
const path = require("path");

const fetchUserPosts = async (req, res) => {
  try {
    const posts = await userpost.find({}).populate("userId", "name bio");
    res.json({ data: posts });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const createUserPost = async (req, res) => {
    const { text = "" } = req.body;
    const file = req.file;
    //console.log("req.file", req.file);

    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    try {
      let cloudinaryResponse = null;
      if(req.file) {
      const localFilePath = path.resolve(file.path); 
      //console.log("Resolved localFilePath:", localFilePath);

      cloudinaryResponse = await uploadOnCloudinary(localFilePath);
      if (!cloudinaryResponse) {
        return res
          .status(500)
          .json({ success: false, message: "Cloudinary upload failed" });
      }

      // Delete the temp file only after upload
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    }
      const createPost = await userpost.create({
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
};



module.exports = {
  fetchUserPosts,
  createUserPost
};



