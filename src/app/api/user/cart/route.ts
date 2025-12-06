import { NextRequest } from "next/server";
import { getDataById, updateData } from "@/lib/firebase/service";
import { verifyToken } from "@/utils/verifyToken";
import { errorMessage, successMessage } from "@/utils/response";
import { CartType } from "@/types/cart.type";
import { UserType } from "@/types/user.type";
import { ProductType, StockType } from "@/types/product.type";
import getCartDiff from "@/app/cart/utils/getCartDiff";

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

type StocksType = {
  id: string;
  stock: StockType[];
};

export async function PUT(request: NextRequest) {
  try {
    const decoded = verifyToken(request);
    if (!decoded) throw new Error();

    const lastCart: CartType[] = (
      (await getDataById("users", decoded.id)) as UserType
    ).cart;
    const newCart: CartType[] = await request.json();

    const diffCart = getCartDiff(lastCart, newCart);

    const products: StocksType[] = [];

    for (const cart of diffCart) {
      const sameProductIdx = products.findIndex(
        (product) => product.id == cart.product_id
      );
      let product;
      if (sameProductIdx == -1) {
        product = await getDataById("products", cart.product_id);
        products.push({ id: cart.product_id, stock: product.stock });
      } else {
        product = products[sameProductIdx];
      }
    }

    for (const cart of diffCart) {
      const productIdx = products.findIndex(
        (product) => product.id == cart.product_id
      );
      const newStock = products[productIdx].stock.map((stock) => {
        if (stock.size == cart.size) {
          return { ...stock, qty: stock.qty - cart.qty };
        }
        return stock;
      });
      products[productIdx].stock = newStock;
    }

    // Update Stock
    try {
      for (const product of products) {
        const res = await updateData("products", product.id, {
          stock: product.stock,
        });
        if (!res) {
          throw new Error();
        }
      }
    } catch {
      errorMessage("Failed to update stock");
    }

    // Update Cart
    try {
      const res = await updateData("users", decoded.id, { cart: newCart });
      if (!res) {
        throw new Error();
      }
    } catch {
      return errorMessage("Failed to update cart");
    }

    return successMessage("Success to update cart", 200);
  } catch {
    return errorMessage();
  }
}
