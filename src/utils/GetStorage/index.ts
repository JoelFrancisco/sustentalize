import { config } from 'dotenv';
import aws from 'aws-sdk';
import multerS3 from 'multer-s3';

config();

const getStorage = () => {
  const s3 = new aws.S3({ 
    region: process.env.AWS_REGION, 
    credentials: { 
      secretAccessKey: process.env.AWS_SECRET_KEY || "",
      accessKeyId: process.env.AWS_ACCESS_KEY || ""
    }
  });
  
  const storage = multerS3({ 
    s3, 
    bucket: process.env.BUCKET_NAME + "/images" || 'sustentalize', 
    contentType: multerS3.AUTO_CONTENT_TYPE, 
    key: (req, file, cb) => {
      cb(null, file.originalname)
    },  
  });
  
  return storage;
}

const storage = getStorage();

export { storage };