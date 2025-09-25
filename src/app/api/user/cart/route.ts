import { NextRequest } from "next/server";
import { getDataById, updateData } from "@/lib/firebase/service";
import { verifyToken } from "@/utils/verifyToken";
import { errorMessage, successMessage } from "@/utils/response";

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

export async function PUT(request: NextRequest) {
  try {
    const decoded = verifyToken(request);
    if (!decoded) throw new Error();

    const data = await request.json();
    const res = await updateData("users", decoded.id, data);
    if (res) {
      return successMessage("Success add to cart", 200);
    }
    return errorMessage("Failed add to cart", 400);
  } catch {
    return errorMessage();
  }
}
