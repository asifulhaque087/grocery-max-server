const bannerResolver = require("./bannerResolver");
const categoryResolver = require("./categoryResolver");
const orderResolver = require("./orderResolver");
const productResolver = require("./productResolver");
const subcategoryResolver = require("./subcategoryResolver");
const userResolver = require("./userResolver");

module.exports = {
  Query: {
    ...userResolver.Query,
    ...categoryResolver.Query,
    ...subcategoryResolver.Query,
    ...bannerResolver.Query,
    ...productResolver.Query,
    ...orderResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...categoryResolver.Mutation,
    ...subcategoryResolver.Mutation,
    ...bannerResolver.Mutation,
    ...productResolver.Mutation,
    ...orderResolver.Mutation,
  },
};
