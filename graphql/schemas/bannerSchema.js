module.exports.bannerSchema = `
  type Banner {
    id: ID!
    name: String!
    photo: String
    createdAt: String!
    updatedAt: String!
  }

  type BannerResponse{
    errors: [FieldError]
    banner: Banner
  }

  input BannerCreateInput {
    photo: String!
  }

  input BannerUpdateInput {
    id: ID!
    photo: String!
  }
`;
