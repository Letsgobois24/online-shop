import { NextRequest, NextResponse } from "next/server";
import { deleteData, getDataById } from "@/lib/firebase/service";

type ParamsType = { params: { id: string } };

export async function DELETE(request: NextRequest, { params }: ParamsType) {
  const { id } = await params;
  const result = await deleteData("users", id);
  console.log(result);
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
}
