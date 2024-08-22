import { useState, useEffect, useCallback } from "react";
import { db } from "@/firebase/config";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  DocumentData,
  updateDoc,
} from "firebase/firestore";
import firebase from "firebase/compat/app";

interface Filter {
  field: string;
  value: any;
  operator?: firebase.firestore.WhereFilterOp;
}

export const useCollection = <T,>(
  path: string,
  filters: Filter[] = []
): [T[] | null, Models.CollectionActions<T>] => {
  const [state, setState] = useState<T[] | null>(null);
  const ref = collection(db, path);

  useEffect(() => {
    let q = query(ref);

    filters.forEach((filter) => {
      q = query(q, where(filter.field, filter.operator || "==", filter.value));
    });

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items: T[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id } as T);
      });
      setState(items);
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  const add = useCallback(
    async (data: T): Promise<T> => {
      return await addDoc(ref, data as DocumentData).then((docRef) => {
        updateDoc(docRef, { id: docRef.id });
        return { ...data, id: docRef.id } as T;
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
