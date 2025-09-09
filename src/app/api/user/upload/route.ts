import { NextResponse, type NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { updateData, uploadFile } from "@/lib/firebase/service";

export async function PUT(request: NextRequest) {
  const token = request.headers.get("Authorization")?.split(" ")[1] || "";
  const formData = await request.formData();
  const file = formData.get("upload-image") as File;

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
    const id = decoded.id;
    try {
      const url = await uploadFile(id, file);
      await updateData("users", id, { image: url });
      return NextResponse.json(
        {
          success: true,
          message: "Success to change profile",
          image: url,
        },
        { status: 200 }
      );
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to upload image",
        },
        { status: 500 }
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
