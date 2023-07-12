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
    category: Category 
    createdAt: String
  }


  type CategoryAndProduct{
    categories: [Category]
    products: [Product]
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
    category: ID
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
    category: ID
  }
`;
