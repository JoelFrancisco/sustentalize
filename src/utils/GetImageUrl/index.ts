import aws from 'aws-sdk';

const getImageUrl = (key: string) => {
  const s3 = new aws.S3({ 
    region: process.env.AWS_REGION, 
    credentials: { 
      secretAccessKey: process.env.AWS_SECRET_KEY || "",
      accessKeyId: process.env.AWS_ACCESS_KEY || ""
    }
  });

  const url = s3.getSignedUrl('getObject', {
    Bucket: "sustentalize/images",
    Key: key,
    Expires: 99999
  });
  
  return url;
}

export { getImageUrl };