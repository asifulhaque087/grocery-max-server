const autopopulate = require("mongoose-autopopulate");

const mongoose = require("mongoose");
const { deleteFromCloudinary } = require("../utils/imageUtils");

const bannerSchema = mongoose.Schema({
  // name: {
  //   type: String,
  // },
  photo: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
bannerSchema.plugin(autopopulate);

// Delete images
bannerSchema.pre("remove", async function (next) {
  if (this.photo) {
    await deleteFromCloudinary(this.photo);
  }

  next();
});

module.exports = mongoose.model("Banner", bannerSchema);
