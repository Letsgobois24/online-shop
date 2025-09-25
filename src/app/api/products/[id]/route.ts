import { type NextRequest } from "next/server";
import {
  deleteData,
  deleteFile,
  getDataById,
  updateData,
  uploadFile,
} from "@/lib/firebase/service";
import { errorMessage, successMessage } from "@/utils/response";
import { verifyToken } from "@/utils/verifyToken";

type ParamsType = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: ParamsType) {
  const { id } = await params;

  try {
    const product = await getDataById("products", id);
    return successMessage("Success to get product", 200, product);
  } catch {
    return errorMessage("Failed to get product", 400);
  }
}

export async function PUT(request: NextRequest, { params }: ParamsType) {
  const { id } = await params;

  try {
    const decoded = verifyToken(request);
    if (!decoded) {
      throw new Error();
    }

    const formData = await request.formData();
    const file = formData.get("product-image") as File;
    formData.delete("product-image");

    let url,
      res = true;
    const data: any = Object.fromEntries(formData.entries());
    if (file) {
      const { fileName } = await getDataById("products", id);
      res = await deleteFile(`products/${id}/${fileName}`);
      url = await uploadFile("products", id, file, "main");
      data.image = url;
    }
    data.price = Number(data.price);
    data.status = data.status == "true" ? true : false;
    data.stock = JSON.parse(data.stock);
    data.updated_at = Date();

    res = (await updateData("products", id, data)) && res;

    if (!res) {
      return errorMessage("Failed to update product", 400);
    }
    return successMessage("Success to update product");
  } catch {
    return errorMessage();
  }
}

export async function DELETE(request: NextRequest, { params }: ParamsType) {
  try {
    const decoded = verifyToken(request, true);
    if (!decoded) {
      throw new Error();
    }
    const { id } = await params;
    const { fileName } = await getDataById("products", id);

    const fileRes = await deleteFile(`products/${id}/${fileName}`);
    const dataRes = await deleteData("products", id);
    if (dataRes && fileRes) {
      return successMessage("Product has been deleted");
    }
    return errorMessage("Failed delete product", 400);
  } catch {
    return errorMessage();
  }
}
