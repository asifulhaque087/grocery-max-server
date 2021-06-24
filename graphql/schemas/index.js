// const gql = require("graphql-tag");
const { gql } = require("apollo-server-express");
const { userSchema } = require("./userSchema");
const { categorySchema } = require("./categorySchema");
const { subcategorySchema } = require("./subcategorySchema");
const { productSchema } = require("./productSchema");
const { orderSchema } = require("./orderSchema");
const { bannerSchema } = require("./bannerSchema");

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
  ${bannerSchema}

  type Query {
    # 1. user
    getUsers: [User!]!

    # 2. category
    getCategories: [Category!]!
    getCategoriesByAdmin: [CategoryResponse!]!
    getCategory(id: ID!): Category!

    # 2. Banner
    getBanners: [Banner!]!
    getBannersByAdmin: [BannerResponse!]!
    getBanner(id: ID!): Banner!

    # 4. subcategory
    getSubcategories: [SubcategoryResponse!]!
    getSubcategory(id: ID!): Subcategory!
    getCatToSub(categoryId: ID!): [Subcategory!]
    getSubcategoryNormal(id: ID!): Subcategory!

    # 5. product
    getProductsByAdmin: [ProductResponse!]!
    getProductByAdmin(id: ID!): Product!
    getProductDetails(id: ID!): Product!
    getSubToPro(subcategoryId: ID!): [Product!]
    getBestSellingProducts: [Product!]
    getBestNewArrivalProducts: [Product!]
    getMostDiscountProducts: [Product!]
    getKeywordProducts(keyword: String): [Product!]

    # 6. order
    getOrders: [Order!]!
    getOrder(id: ID!): Order!
    getUserToOrder: [Order]!
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

    # 3. banner
    createBanner(input: BannerCreateInput): BannerResponse!
    updateBanner(input: BannerUpdateInput): BannerResponse!
    deleteBanner(id: ID!): BannerResponse!

    # 4. subcategory
    createSubcategory(input: SubcategoryCreateInput): SubcategoryResponse!
    updateSubcategory(input: SubcategoryUpdateInput): SubcategoryResponse!
    deleteSubcategory(id: ID!): SubcategoryResponse!

    # 5. product
    createProduct(input: ProductCreateInput): ProductResponse!
    updateProduct(input: ProductUpdateInput): ProductResponse!
    deleteProduct(id: ID!): ProductResponse!

    # 6. order
    createOrder(input: OrderCreateInput): Order!
    updateOrderToPaid(input: OrderUpdateToPaidInput): Order!
    updateOrderToDelivered(id: ID!): Order!
    deleteOrder(id: ID!): Order!
    deleteOrderByUser(id: ID!): Order!
  }
`;

// server -> type Query/Mutation  -> resolver
