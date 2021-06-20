module.exports.validateCategoryInput = (name, photo) => {
  const errors = [];
  const makeError = (field, message) => {
    errors.push({ field, message });
  };

  if (name.trim() === "") {
    makeError("name", "Category name must not be empty");
  }
  if (photo.trim() === "") {
    makeError("photos", "Photo  must  be provided");
  }

  return {
    errors,
    valid: errors.length < 1,
  };
};
