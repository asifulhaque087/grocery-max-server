const path = require("path");
const fs = require("fs");

module.exports.singleImageDelete = async (image) => {
  await fs.unlink(path.join(__dirname, `../public/images/${image}`), (err) => {
    if (err) {
      console.log(err);
      // throw new Error("photo cant be deleted");
    }
  });
};

// if exists

module.exports.singleImageExist = async (image) => {
  await fs.access(
    path.join(__dirname, `../../public/images/${image}`),
    (err) => {
      if (err) {
        return false;
      } else {
        return true;
      }
    }
  );
};
