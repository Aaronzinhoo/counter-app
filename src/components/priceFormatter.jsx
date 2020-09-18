import React from "react";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const formatPrice = (price) => {
  return formatter.format(price);
};

export default formatPrice;
