module.exports.validateSubsubcategoryInput = (
  name,
  photo,
  category,
  subcategory
) => {
  const errors = {};
  if (name.trim() === "") {
    errors.name = "name must not be empty";
  }
  // if (photo.length > 1) {
  //   errors.photo = "photo must be provided";
  // }
  // if (subcategory.trim() === "") {
  //   errors.category = "category must not be empty";
  // }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
