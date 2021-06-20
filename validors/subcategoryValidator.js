module.exports.validateSubcategoryInput = (name, photo, category) => {
  const errors = [];
  const makeError = (field, message) => {
    errors.push({ field, message });
  };

  if (name.trim() === "") {
    makeError("name", "Subcategory name must not be empty");
  }

  if (category === "") {
    makeError("category", "Category must be provided");
  }

  return {
    errors,
    valid: errors.length < 1,
  };
};
