const express = require("express");
const User = require("../models/user.model");
const { gernateAccessToken } = require("../utils/service");
const { authCheck } = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/check-auth", authCheck, (req, res) => {
  if (req.user == null) {
    return res.json({ isLoggedIn: false });
  } else {
    //console.log("req.user" , req.user);
    return res.json({ isLoggedIn: true });
  }
});

router.post("/signup", async (req, res) => {

  const { name, email, bio, password } = req.body;
  try {
    if (!email && !name) {
      return res
        .status(401)
        .json({ scuess: false, message: "please send name and email" });
    }
    
    const newUser = await User.create({ email, name, bio, password });
    res.status(201).json({ success: true, message: "User created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  if (!email) {
    return res
      .status(401)
      .json({ scuess: false, message: "Please provide email and password" });
  }

  try {
    const user = await User.findOne({ email });
    console.log(user);

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
    console.log("accessToken :", accessToken);

    res
      .status(200)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
      })
      .json({ sccuess: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/logout", (req, res) => {});

module.exports = router;
