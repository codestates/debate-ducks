import AWS from "aws-sdk";

export default async function saveVideo(file, fileName) {
  const s3 = new AWS.S3({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    region: process.env.REACT_APP_AWS_REGION,
  });

  const params = {
    Bucket: "debate-ducks-video",
    Key: fileName,
    Body: file,
    ContentEncoding: "base64",
    ContentType: "video/webm",
  };

  try {
    const result = await s3.upload(params).promise();
    if (result.Location) {
      console.log(result.Location);
      return result.Location;
    }
  } catch (err) {
    console.log(err);
  }

  return null;
}
