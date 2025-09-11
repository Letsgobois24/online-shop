import { NextResponse, type NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { getDataById, updateData } from "@/lib/firebase/service";

// Get Profile
export async function GET(request: NextRequest) {
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

    const profile = await getDataById("users", decoded.id);
    return NextResponse.json(
      {
        success: true,
        message: "Success to get user profile",
        data: profile,
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

// Update Profile
export async function PUT(request: NextRequest) {
  const data = await request.json();
  const token = request.headers.get("Authorization")?.split(" ")[1] || "";

  try {
    const decoded: any = jwt.verify(token, process.env.NEXTAUTH_SECRET || "");
    console.log(decoded);

    const res = await updateData("users", decoded.id, data);
    if (!res) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to change profile",
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "Profile has been changed",
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
