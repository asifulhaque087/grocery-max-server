const { cloudinary } = require("./cloudinary");

function extractPublicId(imgUrl) {
  // Extract substring starting from "grocery" and ending before "."
  let regex = /grocery-(.*?)\./;
  let result = imgUrl.match(regex)[1];
  result = "grocery-" + result;
  return result;
}

function generateRandomString(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports.base64ToCloudinary = async (photo) => {
  const uploadedResponse = await cloudinary.uploader.upload(photo, {
    folder: `grocery-max/`,
  });
  return uploadedResponse.secure_url;
};

module.exports.updateFromCloudinary = async (oldPhoto, newPhoto) => {
  await this.deleteFromCloudinary(oldPhoto);
  return this.base64ToCloudinary(newPhoto);
};

module.exports.deleteFromCloudinary = async (photo) => {
  const publicId = extractPublicId(photo);
  const uploadedResponse = await cloudinary.uploader.destroy(publicId);
  return uploadedResponse;
};
