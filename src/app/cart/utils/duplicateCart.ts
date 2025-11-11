import { CartType } from "@/types/cart.type";
import { ProductType } from "@/types/product.type";

const duplicateCart = (productCart: (CartType & ProductType)[]) => {
  return productCart.map((product) => {
    return {
      product_id: product.product_id,
      qty: product.qty,
      size: product.size,
    };
  });
};

export default duplicateCart;
