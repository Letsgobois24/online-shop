import { NextRequest, NextResponse } from "next/server";
import { deleteData, updateData } from "@/lib/firebase/service";
import jwt from "jsonwebtoken";

// type ParamsType = { params: { id: string } };

export async function PUT(request: NextRequest, { params }: any) {
  const { id } = await params;
  const data = await request.json();
  const token = request.headers.get("Authorization")?.split(" ")[1] || "";

  try {
    const decoded: any = jwt.verify(token, process.env.NEXTAUTH_SECRET || "");
    if (decoded?.role !== "admin") {
      throw new Error();
    }

    const res = await updateData("users", id, data);
    if (res) {
      return NextResponse.json(
        {
          success: true,
          message: "Data telah berhasil diubah",
          data,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Data gagal untuk diubah",
        },
        { status: 400 }
      );
    }
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

export async function DELETE(request: NextRequest, { params }: any) {
  const { id } = await params;
  const token = request.headers.get("Authorization")?.split(" ")[1] || "";

  try {
    const decoded: any = jwt.verify(token, process.env.NEXTAUTH_SECRET || "");

    if (decoded?.role !== "admin") {
      throw new Error();
    }

    const result = await deleteData("users", id);
    if (result) {
      return NextResponse.json(
        {
          success: true,
          message: "Data pengguna berhasil dihapus",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Data pengguna gagal dihapus",
        },
        { status: 400 }
      );
    }
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
