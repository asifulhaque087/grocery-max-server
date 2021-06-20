// register

module.exports.validateRegisterInput = (
  name,
  email,
  password,
  confirmPassword
) => {
  let errors = [];

  const makeError = (field, message) => {
    errors.push({ field, message });
  };

  if (name.trim() === "") {
    makeError("name", "name must not be empty");
  }

  if (email.trim() === "") {
    makeError("email", "Email must not be empty");
  } else {
    const regEx =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!email.match(regEx)) {
      makeError("email", "Email must be a valid email address");
    }
  }

  if (password.length < 6) {
    makeError("password", "Password must be atleast 6");
  } else if (password != confirmPassword) {
    makeError("confirmPassword", "Password must match");
  }

  return {
    errors,
    valid: errors.length < 1,
  };
};

// login

module.exports.validateLoginInput = (email, password) => {
  let errors = [];
  if (email.trim() === "") {
    errors.push({ field: "email", message: "Email must not be empty" });
  } else {
    const regEx =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!email.match(regEx)) {
      errors.push({
        field: "email",
        message: "Email must be a valid email address",
      });
    }
  }

  if (password.length < 6) {
    errors.push({
      field: "password",
      message: "Password must be atleast 6",
    });
  }

  return {
    errors,
    valid: errors.length < 1,
  };
};

// forgot password

module.exports.validateForgotPasswordInput = (email) => {
  let errors = [];
  if (email.trim() === "") {
    errors.push({ field: "email", message: "Email must not be empty" });
  } else {
    const regEx =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!email.match(regEx)) {
      errors.push({
        field: "email",
        message: "Email must be a valid email address",
      });
    }
  }

  return {
    errors,
    valid: errors.length < 1,
  };
};

// reset password

module.exports.validateResetPasswordInput = (
  resetToken,
  password,
  confirmPassword
) => {
  const errors = [];

  if (resetToken.trim() === "") {
    errors.push({
      field: "resetToken",
      message: "Reset token must not be empty",
    });
  }

  if (password.length < 6) {
    errors.push({
      field: "password",
      message: "Password must be atleast 6",
    });
  } else if (password != confirmPassword) {
    errors.push({
      field: "confirmPassword",
      message: "Passwords must match",
    });
  }

  return {
    errors,
    valid: errors.length < 1,
  };
};

// {
//   resetToken: "slakdfjaslkdfj";
// }
