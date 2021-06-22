const fs = require("fs");
const { generateRandomString } = require("./randomString");

module.exports.base64ToImageUpload = (photo) => {
  let buff = Buffer.from(photo.split(",")[1], "base64");
  const ext = photo.split(";")[0].split("/")[1];
  const randomName = `${generateRandomString(12)}.${ext}`;
  fs.writeFile(`./public/images/${randomName}`, buff, function (err) {
    if (err) throw err;
    // console.log("Results Received");
  });
  return randomName;
};
