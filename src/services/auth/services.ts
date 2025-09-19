import { addData, getDataByEmail } from "@/lib/firebase/service";
import bcrypt from "bcrypt";
import { User } from "next-auth";

export async function signUp(data: User) {
  const snapshot = await getDataByEmail(data.email || "");

  if (!snapshot.empty) {
    return { success: false, statusCode: 400, message: "Email already exists" };
  }

  try {
    data.role = "member";
    if (!data.password) {
      return {
        success: false,
        statusCode: 400,
        message: "Password is required",
      };
    }

    data.password = await bcrypt.hash(data.password, 10);
    await addData("users", data);

    return { success: true, statusCode: 200, message: "Sign up success" };
  } catch {
    return { success: false, statusCode: 400, message: "Sign up error" };
  }
}

export async function signIn(email: string): Promise<User | null> {
  const snapshot = await getDataByEmail(email);

  if (!snapshot.empty) {
    const userData = snapshot.docs[0];
    return { id: userData.id, ...(userData.data() as Omit<User, "id">) };
  }
  return null;
}

export async function signInWithGoogle(
  data: User
): Promise<{ id: string } & User> {
  const snapshot = await getDataByEmail(data.email || "");

  if (!snapshot.empty) {
    const userData = snapshot.docs[0];
    return { id: userData.id, ...(userData.data() as Omit<User, "id">) };
  }

  data.role = "member";
  return await addData("users", data);
}
