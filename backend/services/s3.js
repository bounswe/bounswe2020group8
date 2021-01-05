const AWS = require("aws-sdk");
const Config = require("../config");
const Sharp = require("sharp");

AWS.config.update({
  accessKeyId: Config.s3.accessKeyId,
  secretAccessKey: Config.s3.secretAccessKey,
});

const removeDataHeaderFromBase64EncodedImage = (data) =>
  data.replace(/^data:image\/\w+;base64,/, "");

const formatBase64ImageForS3 = (image) =>
  new Buffer(removeDataHeaderFromBase64EncodedImage(image), "base64");

exports.resizeBase64Image = async (image, size) => {
  if (size === "original") return image;
  const withoutDataHeader = removeDataHeaderFromBase64EncodedImage(image);
  const inputBuffer = new Buffer(withoutDataHeader, "base64");
  const outputBuffer = await Sharp(inputBuffer).resize(size, size).toBuffer();
  const dataPrefix = "data:image/jpeg;base64,";
  return `${dataPrefix}${outputBuffer.toString("base64")}`;
};

exports.uploadImage = async (base64Image, bucket, fileName) => {
  const S3Client = new AWS.S3();

  let buffer = formatBase64ImageForS3(base64Image);

  const putObjectRequest = {
    Bucket: bucket,
    Body: buffer,
    Key: fileName,
    ContentEncoding: "base64",
    ContentType: "image/jpeg",
    ACL: "public-read",
  };

  return await S3Client.upload(putObjectRequest).promise();
};
