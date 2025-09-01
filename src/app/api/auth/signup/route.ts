import { signUp } from "@/services/auth/services";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const req = await request.json();
  const res = await signUp(req);

  return NextResponse.json(
    {
      success: res.success,
      message: res.message,
    },
    { status: res.statusCode }
  );
}
