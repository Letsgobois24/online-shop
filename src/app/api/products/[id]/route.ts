import { type NextRequest, NextResponse } from "next/server";
import {
  deleteData,
  deleteFile,
  getDataById,
  updateData,
  uploadFile,
} from "@/lib/firebase/service";
import jwt from "jsonwebtoken";

type PropsType = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: PropsType) {
  const { id } = await params;
  try {
    const product = await getDataById("products", id);

    return NextResponse.json(
      {
        success: true,
        message: "Success to get product",
        data: product,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({
      success: true,
      message: "Failed to get product",
    });
  }
}

export async function PUT(request: NextRequest, { params }: any) {
  const { id } = await params;
  const token = request.headers.get("Authorization")?.split(" ")[1] || "";

  if (!token) {
    return NextResponse.json(
      {
        success: false,
        message: "Token not found",
      },
      { status: 401 }
    );
  }

  try {
    const decoded: any = jwt.verify(token, process.env.NEXTAUTH_SECRET || "");
    if (!decoded) {
      throw new Error();
    }

    const formData = await request.formData();
    const file = formData.get("product-image") as File;
    formData.delete("product-image");

    let url,
      res = true;
    const data: any = Object.fromEntries(formData.entries());
    console.log({ file });
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

    if (res) {
      return NextResponse.json(
        {
          success: true,
          message: "Success to update product",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: true,
          message: "Failed to update product",
        },
        { status: 400 }
      );
    }
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Access denied",
      },
      { status: 403 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: any) {
  const { id } = await params;
  const token = request.headers.get("Authorization")?.split(" ")[1] || "";

  try {
    const decoded: any = jwt.verify(token, process.env.NEXTAUTH_SECRET || "");

    if (decoded?.role !== "admin") {
      throw new Error();
    }
    const { fileName } = await getDataById("products", id);

    const fileRes = await deleteFile(`products/${id}/${fileName}`);
    const dataRes = await deleteData("products", id);
    if (dataRes && fileRes) {
      return NextResponse.json(
        {
          success: true,
          message: "Product has been deleted",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Failed delete product",
        },
        { status: 400 }
      );
    }
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Access denied",
      },
      { status: 403 }
    );
  }
}
