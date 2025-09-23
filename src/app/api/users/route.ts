import { type NextRequest, NextResponse } from "next/server";
import { getAllData } from "@/lib/firebase/service";
import { User } from "next-auth";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
  const token = request.headers.get("Authorization")?.split(" ")[1] || "";

  try {
    if (!token) {
      throw new Error();
    }

    const decoded: any = jwt.verify(token, process.env.NEXTAUTH_SECRET || "");
    if (!decoded || decoded?.role != "admin") {
      throw new Error();
    }
    const users = await getAllData("users");
    users.map((user: User) => {
      delete user.password;
    });

    return NextResponse.json(
      {
        success: true,
        message: "Success to get data",
        data: users,
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
