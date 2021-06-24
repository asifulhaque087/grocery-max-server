module.exports.validateBannerInput = (photo) => {
  const errors = [];
  const makeError = (field, message) => {
    errors.push({ field, message });
  };

  if (photo.trim() === "") {
    makeError("photos", "Photo  must  be provided");
  }

  return {
    errors,
    valid: errors.length < 1,
  };
};
