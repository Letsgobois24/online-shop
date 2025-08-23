import { firestoreAdmin } from "./init";
import bcrypt from "bcrypt";

type userType = {
  email: string;
  phone: string;
  password: string;
  role?: string;
};

export async function signUp(data: userType) {
  const snapshot = await firestoreAdmin
    .collection("users")
    .where("email", "==", data.email)
    .limit(1)
    .get();

  if (!snapshot.empty) {
    return { status: false, statusCode: 400, message: "Email already exists" };
  }

  try {
    data.role = "member";
    data.password = await bcrypt.hash(data.password, 10);
    await firestoreAdmin.collection("users").add({
      ...data,
      createdAt: new Date(),
    });

    return { status: true, statusCode: 200, message: "Sign up success" };
  } catch {
    return { status: false, statusCode: 400, message: "Sign up error" };
  }
}
