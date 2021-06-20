module.exports.validateVariationInput = (name) => {
  const errors = {};
  if (name.trim() === "") {
    errors.name = "name must not be empty";
  }
  // if (photo.length > 1) {
  //   errors.photo = "photo must be provided";
  // }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
