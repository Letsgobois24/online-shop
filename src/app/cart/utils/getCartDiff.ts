import { CartType } from "@/types/cart.type";

const getCartDiff = (lastCart: CartType[], newCart: CartType[]) => {
  const mapLast = new Map();
  const mapNew = new Map();

  lastCart.forEach((item) => {
    const key = item.product_id + "_" + item.size;
    mapLast.set(key, item.qty);
  });

  newCart.forEach((item) => {
    const key = item.product_id + "_" + item.size;
    mapNew.set(key, item.qty);
  });

  const keys = new Set([...mapLast.keys(), ...mapNew.keys()]);
  const diff: CartType[] = [];

  keys.forEach((key) => {
    const lastQty = mapLast.get(key) || 0;
    const newQty = mapNew.get(key) || 0;

    if (lastQty !== newQty) {
      const [product_id, size] = key.split("_");
      diff.push({
        product_id,
        size: Number(size),
        qty: newQty - lastQty,
      });
    }
  });

  return diff;
};

export default getCartDiff;
