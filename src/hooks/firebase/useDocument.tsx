import { useState, useEffect, useCallback, useMemo } from "react";
import "firebase/storage";
import { db } from "@/firebase/config";
import {
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  DocumentReference,
} from "firebase/firestore";

export const useDocument = <T,>(
  path: string
): [T | null, Models.DocumentActions<T>] => {
  const ref = doc(db, path) as DocumentReference;
  const [state, setState] = useState<T | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(ref, (doc) => {
      if (doc.exists()) {
        setState(doc.data() as T);
      } else {
        setState(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const set = useCallback(
    async (data: any) => {
      await setDoc(ref, data);
    },
    [ref]
  );

  const update = useCallback(
    async (data: Partial<T>) => {
      await updateDoc(ref, data);
    },
    [ref]
  );

  const remove = useCallback(async () => {
    await deleteDoc(ref);
  }, [ref]);

  const hasResult = useMemo(() => state !== null, [state]);
  const isEmpty = useMemo(() => state === null, [state]);

  return [state, { set, update, remove, ref, path, hasResult, isEmpty }];
};
