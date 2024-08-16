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