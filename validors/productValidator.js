module.exports.validateProductInput = (name, photo, subcategory) => {
  const errors = [];
  const makeError = (field, message) => {
    errors.push({ field, message });
  };

  if (name.trim() === "") {
    makeError("name", "product name must not be empty");
  }

  if (subcategory.trim() === "") {
    makeError("subcategory", "Subcategory must be provided");
  }

  return {
    errors,
    valid: errors.length < 1,
  };
};
