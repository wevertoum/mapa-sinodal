namespace Models {
  interface UserContext {
    userData?: UserData;
    saveUserData: (userData: UserData) => void;
    verifyIsLogged: () => void;
    logOut: () => Promise<void>;
  }

  interface UserData {
    email: string;
    token: string;
  }

  interface Login {
    email: string;
    password: string;
  }
}
