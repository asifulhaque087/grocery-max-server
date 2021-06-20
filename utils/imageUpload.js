const path = require("path");
const fs = require("fs");

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

module.exports.multipleImageUpload = async (file) => {
  let all_images = [];
  await Promise.all(
    file.map(async (item) => {
      const { createReadStream, filename, mimetype, encoding } = await item;
      // generateRandomString
      const { ext } = path.parse(filename);
      const randomName = generateRandomString(12) + ext;

      const stream = createReadStream();
      const pathName = path.join(__dirname, `../public/images/${randomName}`);
      await stream.pipe(fs.createWriteStream(pathName));
      all_images.push(randomName);
    })
  );
  return all_images;
};

// single image upload
module.exports.singleImageUpload = async (uploadFolder, file) => {
  const { createReadStream, filename, mimetype, encoding } = await file[0];
  // generateRandomString
  const { ext } = path.parse(filename);
  const randomName = generateRandomString(12) + ext;

  const stream = createReadStream();
  const pathName = path.join(
    __dirname,
    `../../public/images/${uploadFolder}/${randomName}`
  );
  await stream.pipe(fs.createWriteStream(pathName));

  return randomName;
};

// delete single file

module.exports.singleImageDelete = async (folder, image) => {
  await fs.unlink(
    path.join(__dirname, `../../public/images/${folder}/${image}`),
    (err) => {
      if (err) {
        console.log(err);
        throw new UserInputError("Photo cant be deleted", {
          errors: {
            photo: "Photo cant be deleted",
          },
        });
      }
    }
  );
};

// if exists

module.exports.singleImageExist = async (folder, image) => {
  await fs.access(
    path.join(__dirname, `../../public/images/${folder}/${image}`),
    (err) => {
      if (err) {
        return false;
      } else {
        return true;
        // singleImageDelete("category", category.photo);
      }
    }
  );
};
