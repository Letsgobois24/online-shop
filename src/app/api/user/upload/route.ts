import { NextResponse, type NextRequest } from "next/server";
import { updateData, uploadFile } from "@/lib/firebase/service";
import { verifyToken } from "@/utils/verifyToken";
import { errorMessage } from "@/utils/response";

export async function PUT(request: NextRequest) {
  try {
    const decoded: any = verifyToken(request);
    if (!decoded) {
      throw new Error();
    }

    const formData = await request.formData();
    const file = formData.get("upload-image") as File;

    const id = decoded.id;
    try {
      const fileName = "profile." + file.type.split("/")[1];
      const url = await uploadFile("users", id, file, fileName);
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
      return errorMessage("Failed to upload image", 400);
    }
  } catch {
    return errorMessage();
  }
}
