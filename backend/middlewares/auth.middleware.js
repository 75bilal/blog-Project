// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/user.model'); // ✅ FIX: correct path

const authCheck = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.header("authorization")?.split(" ")[1];
   // console.log("Token from middleware:", token);
    if (!token) {
      req.user = null;
      return next();
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ FIX: add try/catch

    const user = await User.findById(decoded.id).select("-password");
    //console.log("User from middleware:", user);
    if (user) {
      req.user = user;
      //console.log("user from middleware" , req.user);
    } else {
      req.user = null;
    }

    return next();
  } catch (error) {
    console.log("authCheck error:", error.message);
    req.user = null;
    next();
  }
};
``
module.exports = { authCheck };
