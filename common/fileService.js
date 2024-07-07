const multer = require("multer");
let fs = require("fs");
let dir = "./fles/logos";

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const fileStorageEngine = multer.diskStorage({

  destination: (req, file, cb) => {
    try {
      cb(null, dir);
    } catch (err) {
      console.log(err)
    }
  },
  filename: (req, file, cb) => {
    try {
      cb(null, Date.now() + "-" + file.originalname);
    } catch (err) {
      console.log(err)
    }
  },
});

const upload = multer({ storage: fileStorageEngine });

module.exports = upload;