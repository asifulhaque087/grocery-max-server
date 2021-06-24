module.exports.orderSchema = `


type Shipping {
    id: ID!
    phone: String
    address: String
}


input ShippingCreateInput{
    phone: String
    address: String
}



type Payment {
    id: ID!
    status: String
    updateTime: String
    emailAddress: String 
}


type OrderItem {
    id: ID!
    name: String
    count: String
    photo: String
    price : String
    product: Product
}


input OrderItemCreateInput {
    name: String
    count: String
    photo: String
    price : String
    product: ID
}





type Order {
    id: ID!
    paymentMethod: String!
    itemPrice: String
    taxPrice: String
    shippingPrice: String
    totalPrice: String
    isPaid: Boolean
    isDelivered: Boolean
    createdAt: String!
    user: User
    shippingAddress: Shipping
    paymentResult: Payment
    orderItems: [OrderItem!]!
  }




  input OrderCreateInput {
    paymentMethod: String
    itemPrice: String
    taxPrice: String
    shippingPrice: String
    totalPrice: String
    shippingAddress: ShippingCreateInput
    orderItems: [OrderItemCreateInput]
  }








  input OrderUpdateToPaidInput {
    id: ID
    email: String
    source: ID
  }
`;
