import { type NextRequest, NextResponse } from "next/server";
import {
  addData,
  getAllData,
  updateData,
  uploadFile,
} from "@/lib/firebase/service";
import jwt from "jsonwebtoken";

export async function GET() {
  const data = await getAllData("products");

  return NextResponse.json(
    {
      success: true,
      message: "Success to get data",
      data,
    },
    { status: 200 }
  );
}

export async function POST(request: NextRequest) {
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

    const data: any = Object.fromEntries(formData.entries());
    data.price = Number(data.price);
    data.status = data.status == "true" ? true : false;
    data.stock = JSON.parse(data.stock);

    console.log({ data });

    const { id } = await addData("products", data);
    const fileName = `main.${file.type.split("/")[1]}`;
    const url = await uploadFile("products", id, file, fileName);
    await updateData("products", id, { image: url, fileName });

    return NextResponse.json(
      {
        success: true,
        message: "Success to add product",
        url,
      },
      { status: 200 }
    );
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
