namespace Models {
  interface DocumentActions<T> {
    set: (data: T) => Promise<void>;
    update: (data: Partial<T>) => Promise<void>;
    remove: () => Promise<void>;
    ref: DocumentReference<DocumentData, DocumentData>;
    path: string;
    hasResult: boolean;
    isEmpty: boolean;
  }
}
