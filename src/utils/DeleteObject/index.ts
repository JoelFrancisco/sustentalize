import aws from 'aws-sdk';

const deleteObject = (key: string | null | undefined) => {
  if (!key) 
    return;

  const s3 = new aws.S3({ 
    region: process.env.AWS_REGION, 
    credentials: { 
      secretAccessKey: process.env.AWS_SECRET_KEY || "",
      accessKeyId: process.env.AWS_ACCESS_KEY || ""
    }
  });

  s3.deleteObject({ Bucket: 'sustentalize/images', Key: key }, (err, data) => {
    if (err) 
      console.log(err);
  });
}

export { deleteObject };