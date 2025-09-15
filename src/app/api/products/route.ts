import { NextResponse } from "next/server";
import { getAllData } from "@/lib/firebase/service";

export async function GET() {
  const data = await getAllData("products");

  return NextResponse.json(
    {
      success: true,
      message: "Success to get data",
      data,
    },
    { status: 200 }
  );
}
