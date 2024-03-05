import { db } from "./config";
import {
  addDoc,
  getDocs,
  updateDoc,
  collection,
  WithFieldValue,
  DocumentData,
} from "firebase/firestore";

export const dataFromCollection = async <T>(col: string): Promise<T[]> => {
  const querySnapshot = await getDocs(collection(db, col));

  const data = querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });

  return data as T[];
};

export const addDataToCollection = async <T>(
  col: string,
  data: T
): Promise<void> => {
  try {
    await addDoc(
      collection(db, col),
      data as WithFieldValue<DocumentData>
    ).then((docRef) => {
      updateDoc(docRef, { id: docRef.id });
    });
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};
