import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const verifyToken = (request: NextRequest, isAdmin: boolean = false) => {
  const token = request.headers.get("Authorization")?.split(" ")[1] || "";
  if (!token) return null;
  try {
    const decoded: any = jwt.verify(token, process.env.NEXTAUTH_SECRET || "");
    if (isAdmin && decoded.role !== "admin") {
      return null;
    }
    return decoded;
  } catch {
    return null;
  }
};
