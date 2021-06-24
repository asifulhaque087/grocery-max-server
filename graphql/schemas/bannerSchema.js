module.exports.bannerSchema = `
  type Banner {
    id: ID!
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
