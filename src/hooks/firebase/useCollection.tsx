import { useState, useEffect, useCallback } from "react";
import "firebase/storage";
import { db } from "@/firebase/config";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  DocumentData,
  updateDoc,
} from "firebase/firestore";

export const useCollection = <T,>(
  path: string
): [T[] | null, Models.CollectionActions<T>] => {
  const [state, setState] = useState<T[] | null>(null);
  const ref = collection(db, path);

  useEffect(() => {
    const q = query(ref);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items: T[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id } as T);
      });
      setState(items);
    });

    return () => unsubscribe();
  }, [path]);

  const add = useCallback(
    async (data: T) => {
      await addDoc(ref, data as DocumentData).then((docRef) => {
        updateDoc(docRef, { id: docRef.id });
      });
    },
    [ref]
  );

  const remove = useCallback(
    async (id: string) => {
      const docRef = doc(db, path, id);
      await deleteDoc(docRef);
    },
    [path]
  );

  return [state, { add, remove, ref, path }];
};

export default useCollection;
