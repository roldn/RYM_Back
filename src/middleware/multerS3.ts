import { S3Client } from '@aws-sdk/client-s3'
import multer from 'multer'
import multerS3 from 'multer-s3'

require('dotenv').config()

const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME!.toString();
const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION!.toString();
const AWS_PUBLIC_KEY = process.env.AWS_PUBLIC_KEY!.toString();
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY!.toString();

const s3 = new S3Client({
    region: AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: AWS_PUBLIC_KEY,
        secretAccessKey: AWS_SECRET_KEY,
    }
})

const uploadFile = multer({
        storage: multerS3({
        s3: s3,
        bucket: AWS_BUCKET_NAME,
        metadata: function (_req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (_req, file, cb) {
            const [ext] = file.originalname.split(".").slice(-1);
            const fileName = new Date().getTime();
            cb(null, `${fileName}.${ext}`);
        }
    })
})

export default uploadFile

// app.post('/upload', uploadFile.single('photos', 3), function (req, res, next) {
//     res.send('Successfully uploaded ' + req.files.length + ' files!')
// })