const mongoose = require("mongoose");

module.exports.validateMongoId = (id) => {
  const errors = [];
  const makeError = (field, message) => {
    errors.push({ field, message });
  };

  if (!mongoose.isValidObjectId(id)) {
    makeError("id", "This is is invalid");
  }

  return {
    errors,
    valid: errors.length < 1,
  };
};
