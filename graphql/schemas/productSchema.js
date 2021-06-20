module.exports.productSchema = `
  type Product {
    id: ID!
    name: String!
    photo: String
    description: String
    price: String!
    discountPrice: String!
    persentage: String!
    qty: String!
    unit: String!
    stock: String!
    totalSell: String!
    subcategory: Subcategory
    createdAt: String
  }




  type ProductResponse{
    errors: [FieldError]
    product: Product
  }
  
  
  
  
  
  input ProductCreateInput {
    name: String!
    photo: String
    description: String
    price: String
    discountPrice: String
    qty: String
    unit: String
    stock: String
    subcategory: ID
  }
  input ProductUpdateInput {
    id: ID!
    name: String!
    photo: String
    description: String
    price: String
    discountPrice: String
    qty: String
    unit: String
    stock: String
    subcategory: ID
  }
`;
