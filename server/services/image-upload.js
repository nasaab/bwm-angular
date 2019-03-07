var aws = require('aws-sdk');;
var multer = require('multer');
var multerS3 = require('multer-s3');
const config = require('../config');

aws.config.update({
    secretAccessKey: config.secretAccessKey,
    accessKeyId: config.accessKeyId,
    region: 'us-east-2'
})

var s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    console.log('inside fileFilter function afetr type checked');
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPEG or PNG are allowed'), false);
  }
}

var upload = multer({
  fileFilter: fileFilter,
  storage: multerS3({
    acl: 'public-read',
    s3: s3,
    bucket: 'bwm-angular',
    metadata: function (req, file, cb) {          // These are callback function which execute before image store on s3
    //   cb(null, {fieldName: file.fieldname});
        cb(null, {fieldName: 'TESTING_METADATA'});
    },
    key: function (req, file, cb) {
      console.log('insile s3 upload key function');
      cb(null, Date.now().toString())
    }
  })
})

module.exports = upload;