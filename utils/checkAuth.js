const { AuthenticationError } = require("apollo-server-express");

const jwt = require("jsonwebtoken");

const checkAuth = (context) => {
  const authHeader = context.req.headers.authorization;



  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid/Expired token");
      }
    }
    throw new AuthenticationError("Authentication token must be 'Bearer [token] ");
  }




  throw new Error("Authorization header must be provided");
};

// isAdmin

module.exports.isAdmin = (context) => {
  const user = checkAuth(context);
  if (user.role === "admin") {
    return user;
  }
  throw new AuthenticationError("You are not authorized");
};

// isBuyer

module.exports.isBuyer = (context) => {
  const user = checkAuth(context);
  if (user.role === "buyer") {
    return user;
  }
  throw new AuthenticationError("You are not authorized");
};
