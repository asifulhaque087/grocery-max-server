module.exports.validateOrderInput = (
  orderItems,
  shippingAddress,
  paymentMethod,
  taxPrice,
  shippingPrice,
  totalPrice
) => {
  const errors = [];
  const makeError = (field, message) => {
    errors.push({ field, message });
  };

  if (orderItems.length === 0) {
    makeError("orderItems", "No Item Selected");
  }

  if (Object.keys(shippingAddress).length === 0) {
    makeError("shippingAddress", "Shipping Address must be provided");
  }

  if (!shippingAddress.address) {
    makeError("address", "Shipping Address must be provided");
  }
  if (!shippingAddress.phone) {
    makeError("phone", "Shipping phone number must be provided");
  }

  if (!paymentMethod) {
    makeError("paymentMethod", "Payment method must be provided");
  }

  if (!paymentMethod) {
    makeError("paymentMethod", "Payment method must be provided");
  }

  return {
    errors,
    valid: errors.length < 1,
  };
};
