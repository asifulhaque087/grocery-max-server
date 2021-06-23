const { UserInputError } = require("apollo-server-express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const { v4: uuidv4 } = require("uuid");
const Category = require("../../models/Category");
const Order = require("../../models/Order");
const Product = require("../../models/Product");
const Subcategory = require("../../models/Subcategory");
const { isAdmin, isBuyer } = require("../../utils/checkAuth");

module.exports = {
  Query: {
    async getOrders() {
      try {
        const orders = await Order.find().sort({ createdAt: -1 });
        return orders;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getOrder(_, { id }) {
      try {
        const order = await Order.findById(id);
        return order;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    // ============================  Create  =============>

    async createOrder(
      _,
      {
        input: {
          orderItems,
          shippingAddress,
          paymentMethod,
          itemPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        },
      },
      context
    ) {
      // console.log("order crediential");
      // console.log(orderItems);
      // 1. check auth
      const user = isBuyer(context);
      if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error("No order items");
      } else {
        for (let item of orderItems) {
          let product = await Product.findById(item.product);
          product.totalSell =
            parseInt(product.totalSell) + parseInt(item.count);
          product = await product.save();
        }

        let order = new Order({
          user: user.id,
          orderItems,
          shippingAddress,
          paymentMethod,
          itemPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        });

        order = await order.save();

        return order;
      }
    },
    // =========================  Update To Paid =============>

    async updateOrderToPaid(_, { input: { id, email, source } }, context) {
      // console.log("from update order to paid");

      // 1. check auth
      const user = isBuyer(context);

      let order = await Order.findById(id);
      // console.log(order.totalPrice);

      const idempontencyKey = uuidv4();
      // const idempontencyKey = "uuid()";
      if (order) {
        try {
          const customer = await stripe.customers.create({
            email: email,
            source: source,
          });

          // console.log("customer", customer);
          if (customer) {
            const newPayment = await stripe.charges.create({
              amount: parseInt(order.totalPrice),
              currency: "usd",
              customer: customer.id,
              receipt_email: customer.email,
            });

            // console.log("new payment", newPayment);
            order.isPaid = true;
            order.paidAt = Date.now();

            order.paymentResult = {
              id: newPayment.id,
              status: newPayment.status,
              updateTime: newPayment.created,
              emailAddress: newPayment.receipt_email,
            };

            order = await order.save();
            return order;
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        throw new Error("Order not found");
      }

      // return stripe.customers
      //   .create({
      //     email,
      //     source,
      //   })
      //   .then((customer) => {
      //     stripe.charges.create(
      //       {
      //         amount: 203894,
      //         currency: "usd",
      //         customer: customer.id,
      //         receipt_email: email,
      //       },
      //       { idempontencyKey }
      //     );
      //   })
      //   .then((result) => {
      //     return result;
      //   })
      //   .catch((err) => console.log(err));
    },
    // ============================  Delete Order =============>
    async deleteOrder(_, { id }, context) {
      // console.log("hello from deletesubcategory", id);
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
