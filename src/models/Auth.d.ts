namespace Models {
  interface UserContext {
    userData?: UserData;
    saveUserData: (userData: UserData) => void;
  }

  interface UserData {
    email: string;
    token: string;
  }
}
