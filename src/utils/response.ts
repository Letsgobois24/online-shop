import { NextResponse } from "next/server";

export const successMessage = (
  message: string = "success",
  status: number = 200,
  data?: any
) => {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status }
  );
};

export const errorMessage = (
  message: string = "Access denied",
  status: number = 403,
  data?: any
) => {
  const response: { success: boolean; message: string; data?: any } = {
    success: false,
    message,
    data,
  };
  //   if (data) response.data = data;

  return NextResponse.json(response, { status });
};
