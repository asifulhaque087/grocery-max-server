const autopopulate = require("mongoose-autopopulate");

const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    photo: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
    subcategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategory",
        autopopulate: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);
categorySchema.plugin(autopopulate);

module.exports = mongoose.model("Category", categorySchema);
