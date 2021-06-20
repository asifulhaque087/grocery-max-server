
const stripe = require("stripe")(
  "sk_test_51Ial7RIVHzgcEShqPOvFBraW05eeH5KF3hmZ6eJZXBJY7jEyUehRcsYqbXXApMrdNTTeeS1kZpuwpZL6KgYBhqOD0087UaH1mq"
);


const crypto = require("crypto");
const User = require("../../models/User");
const sendEmail = require("../../utils/sendEmail");
const { isAdmin } = require("../../utils/checkAuth");
const {
  validateRegisterInput,
  validateLoginInput,
  validateForgotPasswordInput,
  validateResetPasswordInput,
} = require("../../validors/userValidator");

module.exports = {
  Query: {
    async getUsers(_, __, context) {
      // 1. check auth
      // const user = isAdmin(context);
      try {
        // const users = await User.find({ _id: { $nin: [user.id] } });
        const users = await User.find();
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    // ==============================================  REGISTER  ======================>

    async register(
      _,
      { registerInput: { name, email, password, confirmPassword } }
    ) {
      // console.log("from register");
      // 1. validate user data
      const { valid, errors } = validateRegisterInput(
        name,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        return {
          errors,
        };
      }

      // 2. make sure user doesnot exists
      let user = await User.findOne({ email });

      if (user) {
        errors.push({
          field: "email",
          message: "This email is already taken",
        });
        return {
          errors,
        };
      }

      // 4. create a new user
      user = new User({
        name,
        email,
        password,
      });
      user = await user.save();

      // 5. make token and return with that user
      const token = user.getSignedJwtToken();
      user.token = token;
      return {
        user,
      };
    },
    // ==============================================  LOGIN  =========================>
    async login(_, { loginInput: { email, password } }) {
      // 1. validate user
      const { valid, errors } = validateLoginInput(email, password);

      if (!valid) {
        return {
          errors,
        };
      }

      // 2. make sure user  exists
      const user = await User.findOne({ email });

      if (!user) {
        errors.push({
          field: "error",
          message: "User not found",
        });
        return {
          errors,
        };
      }

      // 3. Check that password match
      const match = await user.matchPassword(password);
      if (!match) {
        errors.push({
          field: "error",
          message: "Wrong crendetials",
        });
        return {
          errors,
        };
      }

      // 4. make token and return with that user
      const token = user.getSignedJwtToken();
      user.token = token;
      return {
        user,
      };
    },
    // ==============================================  FORGOT PASSWORD  ===============>

    async forgotPassword(_, { email }) {
      // 1. validate user data
      const { valid, errors } = validateForgotPasswordInput(email);

      if (!valid) {
        return {
          errors,
        };
      }

      // 2. make sure user does exist
      let user = await User.findOne({ email });

      if (!user) {
        errors.push({
          field: "error",
          message: "User not found",
        });
        return {
          errors,
        };
      }

      // 3. Reset Token Gen and add to database hashed (private) version of token
      const resetToken = user.getResetPasswordToken();

      user = await user.save();

      // Create reset url to email to provided email
      let resetUrl;
      if (user.role === "admin") {
        resetUrl = `http://localhost:3000/admin/resetpassword/${resetToken}`;
      } else {
        resetUrl = `http://localhost:3000/resetpassword/${resetToken}`;
      }
      // HTML Message
      const message = `
      <h1>You have requested a password reset</h1>
      <p>Please make a put request to the following link:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

      try {
        await sendEmail({
          to: user.email,
          subject: "Password Reset Request",
          text: message,
        });
        return { url: "Email Sent, Plz check you spam" };
      } catch (err) {
        console.log(err);

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        if (!user) {
          errors.push({
            field: "error",
            message: "Email could not be sent",
          });
          return {
            errors,
          };
        }
      }
    },
    // ==============================================  RESET PASSWORD  ================>

    async resetPassword(
      _,
      { input: { resetToken, password, confirmPassword } }
    ) {
      // 1. validate user data
      const { valid, errors } = validateResetPasswordInput(
        resetToken,
        password,
        confirmPassword
      );

      if (!valid) {
        return {
          errors,
        };
      }

      // Compare token in URL params to hashed token
      const resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

      let user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
      });

      if (!user) {
        errors.push({
          field: "error",
          message: "Invalid Token",
        });
        return {
          errors,
        };
      }

      user.password = password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      user = await user.save();

      // 5. make token and return with that user
      const token = user.getSignedJwtToken();
      user.token = token;
      return {
        user,
      };
    },
  },
};
