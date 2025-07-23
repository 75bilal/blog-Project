const express = require("express");

const { authCheck } = require("../middlewares/auth.middleware");
const { upload } = require("../middlewares/multer.middleware");

const { fetchUserPosts , createUserPost } = require("../controllers/userpost.controller");
const router = express.Router();



router.get("/userpost", fetchUserPosts);

router.post("/userpost",authCheck,upload.single("media"), createUserPost);

module.exports = router;
