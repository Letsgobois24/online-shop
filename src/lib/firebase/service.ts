import { User } from "next-auth";
import { firestoreAdmin } from "./init";

export type userType = {
  fullname?: string | null | undefined;
  email?: string | null;
  phone: string;
  password: string;
  role?: "member" | "admin";
  type?: "google";
  created_at?: Date;
  updated_at?: Date;
};

export async function getDataByEmail(email: string) {
  return await firestoreAdmin
    .collection("users")
    .where("email", "==", email)
    .limit(1)
    .get();
}

export async function addData(collectionName: string, data: User) {
  data.created_at = new Date();
  data.updated_at = new Date();
  await firestoreAdmin.collection(collectionName).add(data);

  return data;
}

export async function getAllData(collectionName: string) {
  const snapshot = await firestoreAdmin.collection("users").get();

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}
