import { NextResponse, NextRequest } from "next/server";
import { getAllData, updateData } from "@/lib/firebase/service";
import { User } from "next-auth";

export async function GET() {
  const users = await getAllData("users");
  users.map((user: User) => {
    delete user.password;
  });

  return NextResponse.json(
    {
      success: true,
      message: "ok",
      data: users,
    },
    { status: 200 }
  );
}

export async function PUT(request: NextRequest) {
  const { id, data } = await request.json();

  const res = await updateData("users", id, data);
  return NextResponse.json(
    {
      success: true,
      message: res?.message,
    },
    { status: res?.statusCode }
  );
}
