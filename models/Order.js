const autopopulate = require("mongoose-autopopulate");
const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      autopopulate: true,
    },
    orderItems: [
      {
        name: { type: String, required: true },
        count: { type: String, required: true },
        photo: { type: String, required: true },
        price: { type: String, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
          autopopulate: true,
        },
      },
    ],
    shippingAddress: {
      phone: { type: String, required: true },
      address: { type: String, required: true },
      // postalCode: { type: String, required: true },
      // country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      updateTime: { type: String },
      emailAddress: { type: String },
    },

    itemPrice: {
      type: String,
      required: true,
      default: 0.0,
    },
    taxPrice: {
      type: String,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: String,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: String,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);
orderSchema.plugin(autopopulate);

module.exports = mongoose.model("Order", orderSchema);
