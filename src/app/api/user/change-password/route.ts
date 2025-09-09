import { NextResponse, type NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { updateData } from "@/lib/firebase/service";
import { compare, hash } from "bcrypt";

// Update Profile
export async function PUT(request: NextRequest) {
  const data = await request.json();
  const token = request.headers.get("Authorization")?.split(" ")[1] || "";

  try {
    console.log(0);
    const decoded: any = jwt.verify(token, process.env.NEXTAUTH_SECRET || "");
    const confirmPassword = await compare(
      data.oldPassword,
      data.encryptedPassword
    );

    if (!confirmPassword) {
      console.log("different password");
      return NextResponse.json(
        {
          success: false,
          message: "Failed",
        },
        { status: 400 }
      );
    }

    const password = await hash(data.newPassword, 10);
    const res = await updateData("users", decoded.id, {
      password,
    });

    if (!res) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to update password",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Success to change password",
        password,
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
