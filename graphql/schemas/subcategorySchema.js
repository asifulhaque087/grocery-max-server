module.exports.subcategorySchema = `
type Subcategory {
    id: ID!
    name: String!
    photo: String
    products:[Product]
    category: Category
    createdAt: String!
    updatedAt: String!
  }
  type SubcategoryResponse{
    errors: [FieldError]
    subcategory: Subcategory
  }
  
  input SubcategoryCreateInput {
    name: String!
    photo: String!
    category: ID
  }
  input SubcategoryUpdateInput {
    id: ID!
    name: String!
    photo: String!
    category: ID
  }
`;
