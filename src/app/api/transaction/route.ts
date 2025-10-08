import { type NextRequest } from "next/server";
import { errorMessage, successMessage } from "@/utils/response";
import { createTransaction, getTransaction } from "@/lib/midtrans/transaction";
import { getDataById, updateData, arrayUnion } from "@/lib/firebase/service";
import { verifyToken } from "@/utils/verifyToken";
import { AddressType, UserType } from "@/types/user.type";
import { CartType } from "@/types/cart.type";
import { ProductType } from "@/types/product.type";

type PayloadType = {
  user: {
    fullname: string;
    email: string;
    address: Omit<AddressType, "isMain"> & Partial<Pick<AddressType, "isMain">>;
  };
  transaction: { items: CartType[]; total: number };
};

export async function GET(request: NextRequest) {
  const decoded = verifyToken(request);
  if (!decoded) return errorMessage();

  const { searchParams } = new URL(request.url);
  const order_id = searchParams.get("order_id");

  const transactionDetail = await getTransaction(order_id || "");

  if (transactionDetail)
    return successMessage("Success", 200, transactionDetail);
  return errorMessage("Failed", 400);
}

export async function POST(request: NextRequest) {
  const decoded = verifyToken(request);
  if (!decoded) return errorMessage();

  const payload: PayloadType = await request.json();

  // Generate order token
  const genereteOrderId = `${Date.now()}-${Math.random().toString(16)}`;
  const item_details = await Promise.all(
    payload.transaction.items.map(async (data) => {
      const productDetail: ProductType = await getDataById(
        "products",
        data.product_id
      );
      return {
        id: data.product_id,
        name: productDetail.name,
        quantity: data.qty,
        price: productDetail.price,
        category: productDetail.category,
        url: productDetail.image,
      };
    })
  );

  const params = {
    transaction_details: {
      order_id: genereteOrderId,
      gross_amount: payload.transaction.total,
    },
    customer_details: {
      first_name: payload.user.fullname,
      email: payload.user.email,
      phone: payload.user.address.phone,
      shipping_address: {
        first_name: payload.user.address.recipient,
        phone: payload.user.address.phone,
        address: payload.user.address.addressLine,
      },
    },
    item_details,
  };
  const transaction = await createTransaction(params);
  if (!transaction) {
    return errorMessage("Failed to generate token", 400);
  }

  // Update data transaction
  delete payload.user.address.isMain;
  // const user: UserType = await getDataById("users", decoded.id);
  const newTransaction = {
    ...payload.transaction,
    orderId: genereteOrderId,
    address: payload.user.address,
    token: transaction.token,
    redirect_url: transaction.redirect_url,
    status: "pending",
  };

  const data = {
    transaction: await arrayUnion(newTransaction),
    cart: [],
  };

  const res = await updateData("users", decoded.id, data);
  if (!res) {
    return errorMessage("Failed to update data", 400);
  }
  return successMessage("success", 201, transaction);
}

export async function PUT(request: NextRequest) {
  const decoded = verifyToken(request);
  if (!decoded) return errorMessage();

  const { searchParams } = new URL(request.url);
  const order_id = searchParams.get("order_id");

  const transactionDetail = await getTransaction(order_id || "");
  const user: UserType = await getDataById("users", decoded.id);
  const transactionIdx = user.transaction?.findIndex(
    (item) => item.orderId === order_id
  );
  console.log(user.transaction);
  console.log({ transactionIdx });
  if (!user.transaction || transactionIdx == -1) {
    return errorMessage("Transaction Not Found", 404);
  }

  user.transaction[transactionIdx || 0].status =
    transactionDetail.transaction_status;

  const data = { transaction: user.transaction };
  const res = await updateData("users", decoded.id, data);
  if (res) return successMessage("Success", 200, transactionDetail);
  return errorMessage("Failed", 400);
}
