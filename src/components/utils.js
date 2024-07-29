import { sum } from "ramda";
import useCartItemsStore from "stores/useCartItemsStore";

export const cartTotalOf = (product, priceKey) => {
  const { cartItems } = useCartItemsStore.getState();

  return sum(
    product.map(product => product[priceKey] * cartItems[product.slug])
  );
};
