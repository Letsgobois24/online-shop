import { User } from "next-auth";
import { firestoreAdmin } from "./init";
import bcrypt from "bcrypt";

const checkEmailExist = async (email: string) => {
  return await firestoreAdmin
    .collection("users")
    .where("email", "==", email)
    .limit(1)
    .get();
};

type userType = {
  email: string;
  phone: string;
  password: string;
  role?: string;
};

export async function signUp(data: userType) {
  const snapshot = await checkEmailExist(data.email);

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

export async function signIn(email: string): Promise<User | null> {
  const snapshot = await checkEmailExist(email);

  if (!snapshot.empty) {
    const userData = snapshot.docs[0];
    return { id: userData.id, ...(userData.data() as Omit<User, "id">) };
  }
  return null;
}
