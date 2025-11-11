import productsServices from "@/services/products/services";
import { CartType } from "@/types/cart.type";
import { ProductType } from "@/types/product.type";

export default async function fetchProducts(
  cart: CartType[],
  setProductCart: React.Dispatch<
    React.SetStateAction<(CartType & ProductType)[] | []>
  >
) {
  const newCart: (CartType & ProductType)[] = [];

  for (const item of cart) {
    let productData;
    const sameProduct = newCart.find(
      (product) => product.product_id === item.product_id
    );
    if (sameProduct) {
      productData = { ...sameProduct, ...item };
    } else {
      const res = await productsServices.getProduct(item.product_id);
      productData = { ...item, ...res.data.data };
    }
    newCart.push(productData);
    setProductCart((prev) => [...prev, productData]);
  }
}
