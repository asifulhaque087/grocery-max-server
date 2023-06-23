const { cloudinary } = require("./cloudinary");

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

module.exports.updateFromCloudinary = async (photo) => {
  const uploadedResponse = await cloudinary.uploader.upload(photo, {
    folder: `grocery-max/`,
  });

  return uploadedResponse.secure_url;
};

module.exports.deleteFromCloudinary = async (photo) => {
  const uploadedResponse = await cloudinary.uploader.upload(photo, {
    folder: `grocery-max/`,
  });

  return uploadedResponse.secure_url;
};
