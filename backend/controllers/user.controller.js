
const userModel = require('../models/user.model');
const postModel = require('../models/post.model');

const { gernateAccessToken } = require("../utils/service");

const checkUserExists = (req, res) => {

  //console.log("User from check-auth route:", req.user);
  if (req.user == null) {
    return res.json({ isLoggedIn: false });
  } else {
    //console.log("req.user" , req.user);
    return res.json({ isLoggedIn: true });
  }

}
const fetchUserDataAndPosts = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const posts = await postModel.find({ userId: req.user.id });

   res.status(200).json({ success: true, user, posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const userSignup = async (req, res) => {

  const { name, email, bio, password } = req.body;
  try {
    if (!email && !name) {
      return res
        .status(401)
        .json({ success: false, message: "please send name and email" });
    }

    const newUser = await userModel.create({ email, name, bio, password });
    res.status(201).json({ success: true, message: "User created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res
      .status(401)
      .json({ scuess: false, message: "Please provide email and password" });
  }

  try {
    const user = await userModel.findOne({ email });

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
};


const userLogout = (req, res) => {

    if(!req.cookies.accessToken) {
        return res.status(400).json({ success: false, message: "No user is logged in" });
    }
  res
    .clearCookie("accessToken")
    .json({ success: true, message: "Logged out successfully" });
};




module.exports = {
   checkUserExists,
   fetchUserDataAndPosts,
   userSignup,
   userLogin,
   userLogout
}