namespace Models {
  interface CollectionActions<T> {
    add: (data: T) => Promise<void>;
    remove: (id: string) => Promise<void>;
    ref: firebase.firestore.CollectionReference;
    path: string;
  }
}
