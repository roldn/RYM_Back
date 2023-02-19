import multer from "multer"

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, 'public')
  },
  filename: function (_req, file, cb) {
    const [ext] = file.originalname.split(".").slice(-1);
    const fileName = new Date().getTime();
    cb(null, `${fileName}.${ext}`);
  }
})

const uploadFile = multer({ storage: storage })

export default uploadFile