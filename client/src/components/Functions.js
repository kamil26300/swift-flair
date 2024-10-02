export const formatPriceInINR = (price) => {
  return "₹ " + new Intl.NumberFormat("en-IN").format(price);
};

export const capitalizeFirstLetter = (str) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const discountedPrice = (price, discountPercentage) => {
  return formatPriceInINR(Math.floor(price * (1 - discountPercentage / 100)));
};

export const getTotalCost = (cartItems) => {
  return cartItems.reduce(
    (sum, item) =>
      sum +
      Math.floor(
        item.product.price *
          (1 - item.product.discountPercentage / 100) *
          item.quantity
      ),
    0
  );
};

export const getTotalItems = (cartItems) => {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
};
