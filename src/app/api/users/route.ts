import { type NextRequest } from "next/server";
import { getAllData } from "@/lib/firebase/service";
import { User } from "next-auth";
import { verifyToken } from "@/utils/verifyToken";
import { errorMessage, successMessage } from "@/utils/response";

export async function GET(request: NextRequest) {
  try {
    const decoded = verifyToken(request, true);
    if (!decoded) {
      throw new Error();
    }

    const users = await getAllData("users");
    users.map((user: User) => {
      delete user.password;
    });

    return successMessage("Success to get users", 200, users);
  } catch {
    return errorMessage();
  }
}
