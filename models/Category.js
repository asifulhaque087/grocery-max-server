const autopopulate = require("mongoose-autopopulate");

const mongoose = require("mongoose");
const { deleteFromCloudinary } = require("../utils/imageUtils");

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

// Delete images
categorySchema.pre("remove", async function (next) {
  if (this.photo) {
    deleteFromCloudinary(this.photo);
  }

  next();
});

module.exports = mongoose.model("Category", categorySchema);
