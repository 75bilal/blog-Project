const multer = require("multer");
const ddd = require("..");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = { upload };
