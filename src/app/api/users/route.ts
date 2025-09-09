import { NextResponse } from "next/server";
import { getAllData } from "@/lib/firebase/service";
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
