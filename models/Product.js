const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  photo: {
    type: String,
  },

  description: {
    type: String,
  },

  rating: {
    type: String,
    required: true,
    default: "0",
  },

  numReviews: {
    type: String,
    required: true,
    default: "0",
  },

  reviews: [
    {
      name: { type: String, required: true },
      rating: { type: String, required: true },
      comment: { type: String, required: true },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    },
    {
      timestamps: true,
    },
  ],

  price: {
    type: String,
    required: true,
    default: "0",
  },

  discountPrice: {
    type: String,
    required: true,
    default: "0",
  },
  persentage: {
    type: String,
  },
  qty: {
    type: String,
    required: true,
    default: "0",
  },
  unit: {
    type: String,
  },
  stock: {
    type: String,
    required: true,
    default: "0",
  },

  totalSell: {
    type: String,
    required: true,
    default: "0",
  },

  active: {
    type: Boolean,
    default: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
    ref: "User",
  },
  createdAt: {
    type: Date,
  },

  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory",
    autopopulate: true,
  },
});
productSchema.plugin(autopopulate);

module.exports = mongoose.model("Product", productSchema);
