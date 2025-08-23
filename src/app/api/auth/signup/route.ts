import { signUp } from "@/lib/firebase/service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const req = await request.json();
  const res = await signUp(req);

  return NextResponse.json({
    status: res.status,
    message: res.message,
    statusCode: res.statusCode,
  });
}
