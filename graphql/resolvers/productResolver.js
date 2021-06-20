const { UserInputError } = require("apollo-server-express");
const Product = require("../../models/Product");
const Subcategory = require("../../models/Subcategory");
const { isAdmin } = require("../../utils/checkAuth");
const { validateMongoId } = require("../../validors/commonValidator");
const { validateProductInput } = require("../../validors/productValidator");

module.exports = {
  Query: {
    async getProducts() {
      try {
        const products = await Product.find().sort({ createdAt: -1 });
        return products;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getProduct(_, { id }) {
      console.log("hello from single product");
      try {
        const product = await Product.findById(id);
        return product;
      } catch (error) {
        throw new Error(error);
      }
    },
    async getSubToPro(_, { subcategoryId }) {
      try {
        const products = await Product.find({ subcategory: subcategoryId });
        return products;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    // ============================  Create  =============>

    async createProduct(
      _,
      {
        input: {
          name,
          photo,
          description,
          price,
          discountPrice,
          qty,
          unit,
          stock,
          subcategory,
        },
      },
      context
    ) {
      // const user = isAdmin(context);

      // 2. validate product data
      const { valid, errors } = validateProductInput(name, photo, subcategory);

      if (!valid) {
        return {
          errors,
        };
      }

      // 3. make sure product doesnot exists
      name = name.trim();
      let product = await Product.findOne({ name });
      if (product) {
        errors.push({
          field: "name",
          message: "This product name already exists",
        });
        return {
          errors,
        };
      }

      // 4. create a new product
      product = new Product({
        name,
        photo,
        description,
        price,
        discountPrice,
        persentage: ((discountPrice / price) * 100).toFixed(2),
        qty,
        unit,
        stock,
        // user: user.id,
        subcategory,
      });
      product = await product.save();

      if (subcategory) {
        subcategory = await Subcategory.findOne({ _id: subcategory });
        subcategory.products.push(product);
        await subcategory.save();
      }

      return {
        product,
      };
    },
    // ============================  Update  =============>

    async updateProduct(
      _,
      {
        input: {
          id,
          name,
          photo,
          description,
          price,
          discountPrice,
          qty,
          unit,
          stock,
          subcategory,
        },
      },
      context
    ) {
      // 1. check auth
      // const user = isAdmin(context);

      // 2. validate product data
      const { valid, errors } = validateProductInput(name, photo, subcategory);

      if (!valid) {
        return {
          errors,
        };
      }

      // 3. make sure product  exists
      let product = await Product.findById(id);

      let oldParent;

      if (product.subcategory) {
        oldParent = product.subcategory.id;
      }

      let newParent = true;

      if (oldParent) {
        if (oldParent == subcategory) {
          newParent = false;
        }
      }

      // 5. update the product
      if (product) {
        product.name = name;
        product.photo = photo;
        product.description = description;
        product.price = price;
        product.discountPrice = discountPrice;
        product.persentage = ((discountPrice / price) * 100).toFixed(2);
        product.qty = qty;
        product.unit = unit;
        product.stock = stock;
        product.subcategory = subcategory;
        product = await product.save();

        // 7. Play with parent
        if (newParent) {
          // inject into new parent
          newParent = await Subcategory.findOne({ _id: subcategory });
          if (newParent) {
            newParent.products.push(product);
            await newParent.save();
          }
        }

        if (oldParent) {
          // remove from old parent
          oldParent = await Subcategory.findOne(
            { _id: oldParent },
            {},
            { autopopulate: false }
          );
          if (oldParent) {
            // console.log(oldParent.products);
            let remainingChildrens = oldParent.products.filter(
              (pro) => pro != product.id
            );
            oldParent.products = remainingChildrens;
            // console.log(oldParent.products);
            await oldParent.save();
          }
        }

        return {
          product,
        };
      } else {
        errors.push({ field: "error", message: "Product not found" });
        return {
          errors,
        };
      }
    },
    // ============================  Delete  =============>
    async deleteProduct(_, { id }, context) {
      // 1. check auth
      // const user = isAdmin(context);
      // 2. validate category data
      const { valid, errors } = validateMongoId(id);

      if (!valid) {
        return {
          errors,
        };
      }

      try {
        // 2. make sure product does exists
        let product = await Product.findById(id);
        if (product) {
          product = await product.delete();
          return {
            product,
          };
        } else {
          errors.push({
            field: "error",
            message: "Product not found",
          });
          return {
            errors,
          };
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
