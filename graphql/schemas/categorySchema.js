module.exports.categorySchema = `
  type Category {
    id: ID!
    name: String!
    photo: String
    subcategories: [Subcategory!]
    createdAt: String!
    updatedAt: String!
  }

  type CategoryResponse{
    errors: [FieldError]
    category: Category
  }

  input CategoryCreateInput {
    name: String!
    photo: String!
  }

  input CategoryUpdateInput {
    id: ID!
    name: String!
    photo: String!
  }
`;
