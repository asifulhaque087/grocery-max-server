const { UserInputError } = require("apollo-server-express");
const Category = require("../../models/Category");
const Subcategory = require("../../models/Subcategory");
const { base64ToImageUpload } = require("../../utils/base64ToImageUpload");
const { isAdmin } = require("../../utils/checkAuth");
const { singleImageDelete } = require("../../utils/deleteImage");
const {
  validateSubcategoryInput,
} = require("../../validors/subcategoryValidator");

module.exports = {
  Query: {
    // ========================================= admin operation ===========================
    async getSubcategories(_, __, context) {
      // 1. check auth
      const user = isAdmin(context);
      try {
        const subcategories = await Subcategory.find().sort({ createdAt: -1 });

        newArr = [];

        for (let obj of subcategories) {
          newArr.push({ subcategory: obj });
        }
        return newArr;
      } catch (err) {
        throw new Error(err);
      }
    },
    // ========================================= admin operation ===========================
    async getSubcategory(_, { id }, context) {
      // 1. check auth
      const user = isAdmin(context);
      try {
        const subcategory = await Subcategory.findById(id);
        return subcategory;
      } catch (error) {
        throw new Error(error);
      }
    },
    // ========================================= normal operation ===========================
    async getSubcategoryNormal(_, { id }) {
      try {
        const subcategory = await Subcategory.findById(id);
        return subcategory;
      } catch (error) {
        throw new Error(error);
      }
    },
    // ========================================= normal operation ===========================

    async getCatToSub(_, { categoryId }) {
      try {
        const subcategories = await Subcategory.find({ category: categoryId });
        return subcategories;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    // ============================  Create  =============>

    async createSubcategory(_, { input: { name, photo, category } }, context) {
      // 1. check auth
      // const user = isAdmin(context);

      // 2. validate subcategory data
      const { valid, errors } = validateSubcategoryInput(name, photo, category);

      if (!valid) {
        return {
          errors,
        };
      }

      // 3. make sure subcategory doesnot exists
      name = name.trim();
      let subcategory = await Subcategory.findOne({ name });
      if (subcategory) {
        errors.push({
          field: "name",
          message: "This subcategory name is already exists",
        });
        return {
          errors,
        };
      }

      // create photo

      photo = base64ToImageUpload(photo);

      subcategory = new Subcategory({
        name,
        category,
        photo,
      });
      subcategory = await subcategory.save();

      if (category) {
        category = await Category.findOne({ _id: category });
        category.subcategories.push(subcategory);
        await category.save();
      }
      return {
        subcategory,
      };
    },
    // ============================  Update  =============>

    async updateSubcategory(
      _,
      { input: { id, name, photo, category } },
      context
    ) {
      // 1. check auth
      // const user = isAdmin(context);

      // 2. validate subcategory data
      const { valid, errors } = validateSubcategoryInput(name, photo, category);
      if (!valid) {
        return {
          errors,
        };
      }

      // 3. make sure subcategory  exists
      let subcategory = await Subcategory.findById(id);

      // manipulate photo
      if (subcategory.photo !== photo) {
        singleImageDelete(subcategory.photo);
        photo = base64ToImageUpload(photo);
      }

      let oldParent;

      if (subcategory.category) {
        oldParent = subcategory.category.id;
      }

      let newParent = true;

      if (oldParent) {
        if (oldParent == category) {
          newParent = false;
        }
      }

      // 6. update the subcategory
      if (subcategory) {
        subcategory.name = name;
        subcategory.photo = photo;
        subcategory.category = category;
        subcategory = await subcategory.save();

        // 7. Play with parent
        if (newParent) {
          // inject into new parent
          newParent = await Category.findOne({ _id: category });
          if (newParent) {
            newParent.subcategories.push(subcategory);
            await newParent.save();
          }
        }
        if (oldParent) {
          // remove from old parent
          oldParent = await Category.findOne(
            { _id: oldParent },
            {},
            { autopopulate: false }
          );
          if (oldParent) {
            // console.log(oldParent.subcategories);
            let remainingChildrens = oldParent.subcategories.filter(
              (sub) => sub != subcategory.id
            );
            oldParent.subcategories = remainingChildrens;
            // console.log(oldParent.subcategories);
            await oldParent.save();
          }
        }

        return {
          subcategory,
        };
      } else {
        errors.push({ field: "error", message: "Subcategory not found" });
        return {
          errors,
        };
      }
    },
    // ============================  Delete  =============>
    async deleteSubcategory(_, { id }, context) {
      // 1. check auth
      const user = isAdmin(context);

      try {
        // 2. make sure subcategory doesnot exists
        const subcategory = await Subcategory.findById(id);
        if (subcategory) {
          const deletedSubcategory = await subcategory.delete();
          return deletedSubcategory;
        } else {
          throw new Error("Subcategory not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
