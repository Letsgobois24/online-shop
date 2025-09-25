import { NextRequest } from "next/server";
import { deleteData, updateData } from "@/lib/firebase/service";
import { verifyToken } from "@/utils/verifyToken";
import { errorMessage, successMessage } from "@/utils/response";

type ParamsType = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: ParamsType) {
  try {
    const decoded: any = verifyToken(request, true);
    if (!decoded) {
      throw new Error();
    }

    const { id } = await params;
    const data = await request.json();

    const res = await updateData("users", id, data);
    if (res) {
      return successMessage("Data has been changed", 200, data);
    }
    return errorMessage("Failed to change data", 400);
  } catch {
    return errorMessage();
  }
}

export async function DELETE(request: NextRequest, { params }: ParamsType) {
  try {
    const decoded = verifyToken(request);

    if (!decoded) {
      throw new Error();
    }
    const { id } = await params;

    const result = await deleteData("users", id);
    if (result) {
      return successMessage("Data pengguna berhasil dihapus", 200);
    }
    return errorMessage("Failed to delete user", 400);
  } catch {
    return errorMessage();
  }
}
