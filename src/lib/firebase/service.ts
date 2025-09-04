import { User } from "next-auth";
import { firestoreAdmin } from "./init";

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
  const snapshot = await firestoreAdmin.collection(collectionName).get();

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function getDataById(collectionName: string, id: string) {
  const snapshot = await firestoreAdmin
    .collection(collectionName)
    .doc(id)
    .get();

  if (!snapshot.exists) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

export async function updateData(
  collectionName: string,
  id: string,
  data: any
) {
  const snapshot = await firestoreAdmin
    .collection(collectionName)
    .doc(id)
    .get();

  if (snapshot.exists) {
    try {
      await snapshot.ref.update(data);
      return true;
    } catch {
      return false;
    }
  }
}

export async function deleteData(collectionName: string, id: string) {
  try {
    await firestoreAdmin.collection(collectionName).doc(id).delete();
    return true;
  } catch {
    return false;
  }
}
