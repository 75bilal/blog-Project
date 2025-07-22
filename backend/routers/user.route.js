const express = require("express");
const Data = require("../models/post.model");
const User = require("../models/user.model");

const { gernateAccessToken } = require("../utils/service");
const { authCheck } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/check-auth", authCheck, (req, res) => {
  //console.log("User from check-auth route:", req.user);
  if (req.user == null) {
    return res.json({ isLoggedIn: false });
  } else {
    //console.log("req.user" , req.user);
    return res.json({ isLoggedIn: true });
  }
});

router.get("/me", authCheck, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

     const posts = await Data.find({ userId: req.user.id });
    console.log("User :", user);
  console.log("User Posts:", posts);
  
    res.status(200).json({ success: true, user, posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})







router.post("/signup", async (req, res) => {

  const { name, email, bio, password } = req.body;
  try {
    if (!email && !name) {
      return res
        .status(401)
        .json({ success: false, message: "please send name and email" });
    }
    
    const newUser = await User.create({ email, name, bio, password });
    res.status(201).json({ success: true, message: "User created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //console.log(req.body);

  if (!email) {
    return res
      .status(401)
      .json({ scuess: false, message: "Please provide email and password" });
  }

  try {
    const user = await User.findOne({ email });
    //console.log(user);

    if (!user) {
      return res.json({ success: false, message: "user not found" });
    }
    if (password) {
      const isPasswordCorrect = await user.isPasswordValid(password);

      if (!isPasswordCorrect) {
        return res.json({ success: false, message: "Invalid password" });
      }
    }
    const accessToken = gernateAccessToken(user);
    //console.log("accessToken :", accessToken);

    res
      .status(200)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
      })
      .json({ success: true , token: accessToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/logout", (req, res) => {});

module.exports = router;
