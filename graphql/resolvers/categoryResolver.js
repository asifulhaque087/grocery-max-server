const Category = require("../../models/Category");
const { isAdmin } = require("../../utils/checkAuth");
const { validateCategoryInput } = require("../../validors/categoryValidator");
const { validateMongoId } = require("../../validors/commonValidator");
const { singleImageDelete } = require("../../utils/deleteImage");
const {
  base64ToCloudinary,
  deleteFromCloudinary,
  updateFromCloudinary,
} = require("../../utils/imageUtils");

module.exports = {
  Query: {
    // ========================================= admin operation ===========================
    async getCategoriesByAdmin(_, __, context) {
      // 1. check auth
      const user = isAdmin(context);

      try {
        let categories = await Category.find().sort({ createdAt: -1 });

        newArr = [];

        for (let cat of categories) {
          newArr.push({ category: cat });
        }
        return newArr;
      } catch (err) {
        throw new Error(err);
      }
    },
    // ========================================= admin operation ===========================
    async getCategory(_, { id }, context) {
      // 1. check auth
      const user = isAdmin(context);
      try {
        const category = await Category.findById(id);
        return category;
      } catch (error) {
        throw new Error(error);
      }
    },
    //======================================= normal operation ============================
    async getCategories(_, __, context) {
      try {
        let categories = await Category.find().sort({ createdAt: -1 });
        return categories;

        // newArr = [];

        // for (let cat of categories) {
        //   newArr.push({ category: cat });
        // }
        // return newArr;

        // return [ {category} ];
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    // ============================  Create  =============>

    async createCategory(_, { input: { photo, name, parentId } }, context) {
      parentId = parentId == -1 ? null : parentId;

      // 1. check auth
      const user = isAdmin(context);

      // 2. validate category data

      const { valid, errors } = validateCategoryInput(name, photo);

      if (!valid) {
        return {
          errors,
        };
      }

      // 3. make sure category doesnot exists
      name = name.trim();
      let category = await Category.findOne({ name });
      if (category) {
        errors.push({
          field: "name",
          message: "This category name exists",
        });
        return {
          errors,
        };
      }

      // create photo

      photo = await base64ToCloudinary(photo);

      category = new Category({
        name,
        photo,
        parentId,
      });
      category = await category.save();
      return {
        category,
      };
    },
    // ============================  Update  =============>

    async updateCategory(_, { input: { id, name, photo } }, context) {
      // 1. check auth
      const user = isAdmin(context);

      // 2. validate category data
      const { valid, errors } = validateCategoryInput(name, photo);

      if (!valid) {
        return {
          errors,
        };
      }

      // 3. make sure category  exists
      let category = await Category.findById(id);

      // manipulate photo
      if (category.photo !== photo) {
        photo = await updateFromCloudinary(category.photo, photo);
      }

      if (category) {
        category.name = name;
        category.photo = photo;
        category = await category.save();
        return {
          category,
        };
      } else {
        errors.push({
          field: "error",
          message: "Category not found",
        });
        return {
          errors,
        };
      }
    },
    // ============================  Delete  =============>
    async deleteCategory(_, { id }, context) {
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
        // 2. make sure category  exists
        let category = await Category.findById(id);

        if (category) {
          category = await category.delete();
          return {
            category,
          };
        } else {
          errors.push({
            field: "error",
            message: "Category not found",
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

// const category = Category.findOneAndUpdate(
//   { _id: id },
//   {
//     name,
//     photo,
//   },
//   null,
//   function (err, docs) {
//     if (err) {
//       throw new Error("Category not found");
//     } else {
//       console.log("Original Doc : ", docs);
//       return docs;
//     }
//   }
// );

// return category;
