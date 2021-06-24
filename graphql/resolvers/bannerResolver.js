const { isAdmin } = require("../../utils/checkAuth");
const { validateMongoId } = require("../../validors/commonValidator");
const { base64ToImageUpload } = require("../../utils/base64ToImageUpload");
const { singleImageDelete } = require("../../utils/deleteImage");
const { validateBannerInput } = require("../../validors/bannerValidator");
const Banner = require("../../models/Banner");

module.exports = {
  Query: {
    // ========================================= admin operation ===========================
    async getBannersByAdmin(_, __, context) {
      // 1. check auth
      const user = isAdmin(context);

      try {
        let banners = await Banner.find().sort({ createdAt: -1 });

        newArr = [];

        for (let obj of banners) {
          newArr.push({ banner: obj });
        }
        return newArr;
      } catch (err) {
        throw new Error(err);
      }
    },
    // ========================================= admin operation ===========================
    async getBanner(_, { id }, context) {
      // 1. check auth
      const user = isAdmin(context);
      try {
        const banner = await Banner.findById(id);
        return banner;
      } catch (error) {
        throw new Error(error);
      }
    },
    //======================================= normal operation ============================
    async getBanners(_, __, context) {
      try {
        let banner = await Banner.find().sort({ createdAt: -1 });
        return banner;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    // ============================  Create  =============>

    async createBanner(_, { input: { photo } }, context) {
      // 1. check auth
      const user = isAdmin(context);

      // 2. validate category data

      const { valid, errors } = validateBannerInput(photo);

      if (!valid) {
        return {
          errors,
        };
      }

      // create photo

      photo = base64ToImageUpload(photo);

      let banner = new Banner({
        photo,
      });
      banner = await banner.save();
      return {
        banner,
      };
    },
    // ============================  Update  =============>

    async updateBanner(_, { input: { id, photo } }, context) {
      // 1. check auth
      const user = isAdmin(context);

      // 2. validate category data
      const { valid, errors } = validateBannerInput(photo);

      if (!valid) {
        return {
          errors,
        };
      }

      // 3. make sure banner  exists
      let banner = await Banner.findById(id);

      // manipulate photo
      if (banner.photo !== photo) {
        singleImageDelete(banner.photo);
        photo = base64ToImageUpload(photo);
      }

      if (banner) {
        banner.photo = photo;
        banner = await banner.save();
        return {
          banner,
        };
      } else {
        errors.push({
          field: "error",
          message: "Banner not found",
        });
        return {
          errors,
        };
      }
    },
    // ============================  Delete  =============>
    async deleteBanner(_, { id }, context) {
      // 1. check auth
      const user = isAdmin(context);
      // 2. validate category data
      const { valid, errors } = validateMongoId(id);

      if (!valid) {
        return {
          errors,
        };
      }

      try {
        // 2. make sure banner  exists
        let banner = await Banner.findById(id);

        if (banner) {
          banner = await banner.delete();
          return {
            banner,
          };
        } else {
          errors.push({
            field: "error",
            message: "Banner not found",
          });
          return {
            errors,
          };
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
