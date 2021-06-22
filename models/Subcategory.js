const autopopulate = require("mongoose-autopopulate");

const mongoose = require("mongoose");
const { singleImageDelete } = require("../utils/deleteImage");

const subcategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        autopopulate: true,
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      autopopulate: true,
    },
  },
  {
    timestamps: true,
  }
);
subcategorySchema.plugin(autopopulate);

// Delete images
subcategorySchema.pre("remove", async function (next) {
  if (this.photo) {
    singleImageDelete(this.photo);
  }

  next();
});

module.exports = mongoose.model("Subcategory", subcategorySchema);
