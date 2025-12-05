import { NextRequest } from "next/server";
import { getDataById, updateData } from "@/lib/firebase/service";
import { verifyToken } from "@/utils/verifyToken";
import { errorMessage, successMessage } from "@/utils/response";
import { CartType } from "@/types/cart.type";
import { UserType } from "@/types/user.type";
import { ProductType, StockType } from "@/types/product.type";

export async function GET(request: NextRequest) {
  try {
    const decoded = verifyToken(request);
    if (!decoded) throw new Error();

    const user = await getDataById("users", decoded.id);
    if (!user) {
      return errorMessage("Failed to get cart", 400, []);
    }
    return successMessage("success to get cart", 200, user.cart);
  } catch {
    return errorMessage();
  }
}

export async function POST(request: NextRequest) {
  try {
    const decoded = verifyToken(request);
    if (!decoded) throw new Error();

    const addedCart: CartType = await request.json();
    const lastCart: CartType[] = (
      (await getDataById("users", decoded.id)) as UserType
    ).cart;

    const sameSize = lastCart.find(
      (item) =>
        item.product_id === addedCart.product_id && item.size === addedCart.size
    );
    if (sameSize) {
      return errorMessage("This product has already in cart", 409);
    }
    const newCart = [...lastCart, addedCart];
    const product: ProductType = await getDataById(
      "products",
      addedCart.product_id
    );

    const newStock = product.stock.map((stock) => {
      if (stock.size == addedCart.size) {
        return { ...stock, qty: stock.qty - 1 };
      }
      return stock;
    });

    // Update Stock
    try {
      const addStockRes = await updateData("products", addedCart.product_id, {
        stock: newStock,
      });
      if (!addStockRes) {
        throw new Error();
      }
    } catch {
      return errorMessage("Failed to add stock");
    }

    try {
      const updateCartRes = await updateData("users", decoded.id, {
        cart: newCart,
      });
      if (!updateCartRes) {
        throw new Error();
      }
    } catch {
      // Jika updateCart gagal, stock akan dikembalikan ke semula
      const res = await updateData("products", addedCart.product_id, {
        stock: product.stock,
      });
      if (!res) {
        throw new Error();
      }
      return errorMessage("Failed to add cart");
    }

    return successMessage("Success update cart", 200);
  } catch {
    return errorMessage();
  }
}

export async function PUT(request: NextRequest) {
  try {
    const decoded = verifyToken(request);
    if (!decoded) throw new Error();

    const lastCart: CartType[] = (
      (await getDataById("users", decoded.id)) as UserType
    ).cart;
    const newCart: CartType[] = await request.json();

    console.log(lastCart);
    console.log(newCart);

    // Update Stock
    // let updatedCart: CartType[];
    // try {
    //   for (const cart of lastCart) {
    //     const sameSize = newCart.find(
    //       (findedItem) => findedItem.size == cart.size
    //     );
    //     if(sameSize){}
    //   }
    // } catch(e) {
    //   console.log(e);
    //   return errorMessage("Failed to update stock");
    // }
    let newStocks: CartType[] = [];
    try {
      for (const cart of lastCart) {
        console.log(cart);
        const sameSize = newCart.find(
          (item) => item.product_id == cart.product_id && item.size == cart.size
        );
        if (sameSize) {
          console.log(sameSize);
          console.log(cart.product_id);
          const { stock: stocks }: { stock: StockType[] } = await getDataById(
            "products",
            cart.product_id
          );
          console.log(stocks);
          const stock = stocks.find((item) => item.size == sameSize.size);
          console.log({ ...stock, product_id: cart.product_id });
          if (stock) {
            console.log(cart.qty);
            console.log(sameSize.qty);
            newStocks.push({
              ...sameSize,
              product_id: cart.product_id,
              qty: stock.qty - cart.qty + sameSize.qty,
            });
          }
          // console.log(sameSize);
          // const { stock: stocks }: { stock: StockType[] } = await getDataById(
          //   "products",
          //   cart.product_id
          // );
          // const newStocks = stocks.map((stock) => {
          //   if (stock.size == cart.size) {
          //     return { ...stock, qty: stock.qty - cart.qty + sameSize.qty };
          //   }
          //   return stock;
          // });

          // console.log(newStocks);

          // const newStock = [
          //   ...st
          // ]

          // const updatedStock = {
          //   ...cart,
          // const res = await updateData("products", cart.product_id, {
          //   stock: newStock,
          // });
          // if (!res) throw new Error();
        }
      }
      console.log(newStocks);
    } catch (e) {
      console.log(e);
      return errorMessage("Failed to update stocks");
    }

    // Update Cart
    // try {
    //   const res = await updateData("users", decoded.id, {
    //     cart: newCart,
    //   });
    //   if (!res) {
    //     throw new Error();
    //   }
    // } catch {
    //   return errorMessage("Failed to update cart");
    // }
    return successMessage("Success to update cart", 200);
  } catch {
    return errorMessage();
  }
}
