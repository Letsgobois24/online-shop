import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getDataById, updateData } from "@/lib/firebase/service";

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

    const user = await getDataById("users", decoded.id);
    if (user) {
      return NextResponse.json(
        {
          success: true,
          message: "Success to get cart",
          data: user.cart || [],
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      {
        success: false,
        message: "Failed to get cart",
        data: [],
      },
      { status: 400 }
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

export async function PUT(request: NextRequest) {
  const data = await request.json();
  const token = request.headers.get("Authorization")?.split(" ")[1] || "";

  try {
    const decoded: any = jwt.verify(token, process.env.NEXTAUTH_SECRET || "");
    const res = await updateData("users", decoded.id, data);
    if (res) {
      return NextResponse.json(
        {
          success: true,
          message: "Success add to cart",
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      {
        success: false,
        message: "Failed add to cart",
      },
      { status: 400 }
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
