import { type NextRequest } from "next/server";
import { errorMessage, successMessage } from "@/utils/response";
import { createTransaction, getTransaction } from "@/lib/midtrans/transaction";
import { getDataById, updateData, arrayUnion } from "@/lib/firebase/service";
import { verifyToken } from "@/utils/verifyToken";
import { AddressType, UserType } from "@/types/user.type";
import { CartType } from "@/types/cart.type";
import { ProductType } from "@/types/product.type";

type OthersType = {
  tax: number;
  delivery: number;
};

type PayloadType = {
  user: {
    fullname: string;
    email: string;
    address: Omit<AddressType, "isMain"> & Partial<Pick<AddressType, "isMain">>;
  };
  transaction: { items: CartType[]; others: OthersType; total: number };
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
  console.log(decoded);
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
  console.log(payload);

  const otherParams = [
    {
      id: "tax_price",
      name: "Tax Price",
      quantity: 1,
      price: payload.transaction.others.tax,
    },
    {
      id: "delivery_price",
      name: "Delivery Price",
      quantity: 1,
      price: payload.transaction.others.delivery,
    },
  ];

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
    item_details: [...item_details, ...otherParams],
    // item_details,
    callbacks: { finish: `${process.env.NEXT_PUBLIC_API_URL}/transaction` },
  };

  let transaction;
  console.log(params);
  try {
    transaction = await createTransaction(params);
  } catch (err) {
    console.log(err);
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

  try {
    await updateData("users", decoded.id, data);
    return successMessage("success", 201, transaction);
  } catch {
    return errorMessage("Failed to update data", 400);
  }
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
  if (!user.transaction || transactionIdx == -1) {
    return errorMessage("Transaction Not Found", 404);
  }

  user.transaction[transactionIdx || 0].status =
    transactionDetail.transaction_status;

  const data = {
    transaction: user.transaction,
  };

  const res = await updateData("users", decoded.id, data);
  if (res) return successMessage("Success", 200, transactionDetail);
  return errorMessage("Failed", 400);
}
