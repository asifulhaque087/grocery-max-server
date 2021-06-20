module.exports.userSchema = `

  type User {
    id: ID!
    email: String!
    role: String!
    token: String!
    name: String!
    createdAt: String!
    updatedAt: String!
  }

  input RegisterInput {
    name: String!
    email: String!
    password: String!
    confirmPassword: String!
  }
  input LoginInput {
    email: String!
    password: String!
  }
  type  UserResponse {
    errors: [FieldError]
    user: User
  }
  type ForgotPassword{
    errors: [FieldError]
    url: String
  }
  input ResetPasswordInput {
    resetToken: String!
    password: String!
    confirmPassword: String!
  }
`;
