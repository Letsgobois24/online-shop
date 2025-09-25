import { type NextRequest } from "next/server";
import {
  addData,
  getAllData,
  updateData,
  uploadFile,
} from "@/lib/firebase/service";
import { errorMessage, successMessage } from "@/utils/response";
import { verifyToken } from "@/utils/verifyToken";

export async function GET(request: NextRequest) {
  try {
    const data = await getAllData("products");
    return successMessage("Success to get data", 200, data);
  } catch {
    return errorMessage("Access Denied", 403);
  }
}

export async function POST(request: NextRequest) {
  try {
    const decoded = verifyToken(request, true);
    if (!decoded) throw new Error();
    try {
      const formData = await request.formData();
      const file = formData.get("product-image") as File;
      formData.delete("product-image");

      const data: any = Object.fromEntries(formData.entries());
      data.price = Number(data.price);
      data.status = data.status == "true" ? true : false;
      data.stock = JSON.parse(data.stock);

      const { id } = await addData("products", data);
      const fileName = `main.${file.type.split("/")[1]}`;
      const url = await uploadFile("products", id, file, fileName);
      await updateData("products", id, { image: url, fileName });

      return successMessage("Success to add product");
    } catch {
      return errorMessage("Failed to add data", 403);
    }
  } catch {
    return errorMessage();
  }
}
