const multer = require('multer')
const path = require('path')

// for create a uniq uploaded file name
const storage = multer.diskStorage({
    destination:'images/',
        /* function (req, file, cb) {
    cb(null, "/tmp/my-uploads");
  }, */
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix+ "-"+ file.originalname);
  },
});

const uploader = multer({
    storage:storage,
    fileFilter: (req, file, cb) => {
        const supportedImage = /jpg|png|web/; 
        const extension = path.extname(file.originalname)
        if (supportedImage.test(extension)) {
            cb(null, true)
        } else {
            cb(new Error('must be a jpg/png/web image'))
        }
    },
    limits: {
        fileSize: 500000
    }
}
)
module.exports= uploader