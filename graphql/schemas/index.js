// const gql = require("graphql-tag");
const { gql } = require("apollo-server-express");
const { userSchema } = require("./userSchema");
const { categorySchema } = require("./categorySchema");
const { subcategorySchema } = require("./subcategorySchema");
const { productSchema } = require("./productSchema");
const { orderSchema } = require("./orderSchema");

module.exports = gql`
  type FieldError {
    field: String
    message: String
  }
  ${userSchema}
  ${categorySchema}
  ${subcategorySchema}
  ${productSchema}
  ${orderSchema}

  type Query {
    # 1. user
    getUsers: [User!]!

    # 2. category
    getCategories: [CategoryResponse!]!
    getCategory(id: ID!): Category!

    # 3. subcategory
    getSubcategories: [Subcategory!]!
    getSubcategory(id: ID!): Subcategory!
    getCatToSub(categoryId: ID!): [Subcategory!]

    # 4. product
    getProducts: [Product!]!
    getProduct(id: ID!): Product!
    getSubToPro(subcategoryId: ID!): [Product!]

    # 5. order
    getOrders: [Order!]!
    getOrder(id: ID!): Order!
  }

  type Mutation {
    # 1. user
    register(registerInput: RegisterInput): UserResponse!
    login(loginInput: LoginInput): UserResponse!
    forgotPassword(email: String!): ForgotPassword!
    resetPassword(input: ResetPasswordInput): UserResponse!

    # 2. category
    createCategory(input: CategoryCreateInput): CategoryResponse!
    updateCategory(input: CategoryUpdateInput): CategoryResponse!
    deleteCategory(id: ID!): CategoryResponse!

    # 3. subcategory
    createSubcategory(input: SubcategoryCreateInput): SubcategoryResponse!
    updateSubcategory(input: SubcategoryUpdateInput): SubcategoryResponse!
    deleteSubcategory(id: ID!): SubcategoryResponse!

    # 4. product
    createProduct(input: ProductCreateInput): ProductResponse!
    updateProduct(input: ProductUpdateInput): ProductResponse!
    deleteProduct(id: ID!): ProductResponse!

    # 5. order
    createOrder(input: OrderCreateInput): Order!
    updateOrderToPaid(input: OrderUpdateToPaidInput): Order!
    deleteOrder(id: ID!): Order!
  }
`;

// server -> type Query/Mutation  -> resolver
