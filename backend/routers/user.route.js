const express = require("express");

 
const { checkUserExists , fetchUserDataAndPosts , userSignup , userLogin , userLogout} = require("../controllers/user.controller");

const { authCheck } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/check-auth", authCheck, checkUserExists);

router.get("/me", authCheck, fetchUserDataAndPosts);


router.post("/signup", userSignup);

router.post("/login", userLogin);

router.post("/logout", authCheck, userLogout);

module.exports = router;
