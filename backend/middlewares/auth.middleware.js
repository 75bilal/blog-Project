// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/user.model'); // ✅ FIX: correct path
const secret = "@234$";

const authCheck = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.header("authorization")?.split(" ")[1];

    if (!token) {
      req.user = null;
      return next();
    }

    const decoded = jwt.verify(token, secret); // ✅ FIX: add try/catch

    const user = await User.findById(decoded.id).select("-password");
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

module.exports = { authCheck };
