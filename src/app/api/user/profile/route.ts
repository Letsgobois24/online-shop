import { type NextRequest } from "next/server";
import { getDataById, updateData } from "@/lib/firebase/service";
import { verifyToken } from "@/utils/verifyToken";
import { errorMessage, successMessage } from "@/utils/response";

// Get Profile
export async function GET(request: NextRequest) {
  try {
    const decoded: any = verifyToken(request);
    if (!decoded) {
      throw new Error();
    }

    const profile = await getDataById("users", decoded.id);
    return successMessage("Success to get user profile", 200, profile);
  } catch {
    return errorMessage();
  }
}

// Update Profile
export async function PUT(request: NextRequest) {
  try {
    const decoded = verifyToken(request);
    if (!decoded) {
      throw new Error();
    }
    const data = await request.json();
    console.log({ data });
    const res = await updateData("users", decoded.id, data);
    if (res) {
      return successMessage("Profile has been changed");
    }
    return errorMessage("Failed to change profile", 400);
  } catch {
    return errorMessage();
  }
}
