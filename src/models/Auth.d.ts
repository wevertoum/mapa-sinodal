namespace Models {
  interface UserContext {
    token?: string;
    saveToken: (token: string) => void;
  }
}
