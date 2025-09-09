import { User } from "next-auth";
import { bucket, firestoreAdmin } from "./init";

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
  const result = await firestoreAdmin.collection(collectionName).add(data);

  return { id: result.id, ...data };
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

export async function setData(
  collectionName: string,
  id: string,
  data: object
) {
  try {
    await firestoreAdmin.collection(collectionName).doc(id).set(data);
    return true;
  } catch {
    return false;
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

export async function uploadFile(id: string, file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const fileName = `user/${id}/profile.${file.type.split("/")[1]}`;

  const storageFile = bucket.file(fileName);
  await storageFile.save(buffer, { contentType: file.type });
  const [url] = await storageFile.getSignedUrl({
    action: "read",
    expires: "03-01-2026",
  });
  return url;
}
