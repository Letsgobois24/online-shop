import { type NextRequest } from "next/server";
import { errorMessage, successMessage } from "@/utils/response";
import createTransaction from "@/lib/midtrans/transaction";
import { updateData } from "@/lib/firebase/service";
import { verifyToken } from "@/utils/verifyToken";
import { AddressType } from "@/types/user.type";
import { CartType } from "@/types/cart.type";

type PayloadType = {
  user: {
    fullname: string;
    email: string;
    address: Omit<AddressType, "isMain"> & Partial<Pick<AddressType, "isMain">>;
  };
  transaction: { items: CartType[]; total: number };
};

export async function POST(request: NextRequest) {
  const decoded = verifyToken(request);
  if (!decoded) throw new Error();

  const payload: PayloadType = await request.json();

  // Generate order token
  const genereteOrderId = `${Date.now()}-${Math.random().toString(16)}`;
  const params = {
    transaction_details: {
      order_id: genereteOrderId,
      gross_amount: payload.transaction.total,
    },
    customer_details: {
      first_name: payload.user.fullname,
      email: payload.user.email,
      phone: payload.user.address.phone,
    },
  };
  const transaction = await createTransaction(params);
  if (!transaction) {
    return errorMessage("Failed to generate token", 400);
  }

  // Update data transaction
  delete payload.user.address.isMain;
  const data = {
    transaction: {
      ...payload.transaction,
      address: payload.user.address,
      token: transaction.token,
      redirect_url: transaction.redirect_url,
      status: "pending",
    },
    carts: [],
  };
  const res = await updateData("users", decoded.id, data);
  if (!res) {
    return errorMessage("Failed to update data", 400);
  }
  return successMessage("success", 201, transaction);
}
