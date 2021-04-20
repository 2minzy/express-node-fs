const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

aws.config.update({
  secretAccessKey: process.env.AWSSecretKey,
  accessKeyId: process.env.AWSAccessKeyId,
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'amazon-clone-minji-v1',
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      // const extension = path.extname(file.originalname);
      // const directory = req.body.directory;
      // const fileName = req.body.fileName;
      // const filepath = path.join(directory, fileName + extension);
      cb(null, file.originalname);
    },
  }),
});

module.exports = upload;