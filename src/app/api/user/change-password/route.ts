import { NextResponse, type NextRequest } from "next/server";
import { updateData } from "@/lib/firebase/service";
import { compare, hash } from "bcrypt";
import { verifyToken } from "@/utils/verifyToken";
import { errorMessage } from "@/utils/response";

// Update Profile
export async function PUT(request: NextRequest) {
  try {
    const decoded = verifyToken(request);
    if (!decoded) {
      throw new Error();
    }

    const data = await request.json();
    if (data.encryptedPassword) {
      const confirmPassword = await compare(
        data.oldPassword,
        data.encryptedPassword
      );

      if (!confirmPassword) {
        return errorMessage("Wrong Password!", 401);
      }
    }

    const password = await hash(data.newPassword, 10);
    const res = await updateData("users", decoded.id, {
      password,
    });

    if (!res) {
      return errorMessage("Failed to update password", 400);
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
    return errorMessage();
  }
}
