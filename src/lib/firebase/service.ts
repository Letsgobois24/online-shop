import { User } from "next-auth";
import { bucket, firestoreAdmin } from "./init";
import admin from "firebase-admin";

export async function getDataByEmail(email: string) {
  return await firestoreAdmin
    .collection("users")
    .where("email", "==", email)
    .limit(1)
    .get();
}

export async function addData(
  collectionName: string,
  data: Record<string, unknown> | User
) {
  data.created_at = new Date();
  data.updated_at = new Date();
  const result = await firestoreAdmin.collection(collectionName).add(data);

  return { id: result.id, ...data };
}

export async function getAllData(collectionName: string): Promise<any[]> {
  const snapshot = await firestoreAdmin.collection(collectionName).get();

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function getDataById(
  collectionName: string,
  id: string
): Promise<any> {
  const snapshot = await firestoreAdmin
    .collection(collectionName)
    .doc(id)
    .get();

  if (!snapshot.exists) {
    return null;
  }

  return snapshot.data();
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
    data.updated_at = new Date();
    try {
      await snapshot.ref.update(data);
      return true;
    } catch {
      return false;
    }
  }

  return false;
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

export async function uploadFile(
  folder: string,
  id: string,
  file: File,
  fileName: string
) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const pathName = `${folder}/${id}/${fileName}`;
  const storageFile = bucket.file(pathName);
  await storageFile.save(buffer, { contentType: file.type });
  const [url] = await storageFile.getSignedUrl({
    action: "read",
    expires: "03-01-2026",
  });
  return url;
}

export async function deleteFile(pathName: string) {
  try {
    await bucket.file(pathName).delete();
    return true;
  } catch (err) {
    console.log({ err });
    return false;
  }
}

export async function arrayUnion(values: any) {
  return admin.firestore.FieldValue.arrayUnion(values);
}

// export async function updateArray(
//   collectionName: string,
//   id: string,
//   field: string,
//   values: any
// ) {
//   try {
//     const ref = firestoreAdmin.collection(collectionName).doc(id);
//     await ref.update({
//       [field]: admin.firestore.FieldValue.arrayUnion(values),
//     });
//     console.log("ok");
//     console.log(admin.firestore.FieldValue.arrayUnion(values));
//     return true;
//   } catch {
//     return false;
//   }
// }
