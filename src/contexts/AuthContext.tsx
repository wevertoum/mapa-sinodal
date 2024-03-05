"use client";
import getCookie from "@/actions/getCookie";
import saveCookie from "@/actions/saveCookie";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";

const AuthContext = createContext({} as Models.UserContext);

interface Props {
  children: React.ReactNode;
}
export const AuthContextWrapper: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const [userData, setUserData] = useState<Models.UserData>();

  const saveUserData = useCallback(
    async (userData: Models.UserData) => {
      saveCookie("userData", JSON.stringify(userData))
        .then(() => {
          router.push("/protected/dashboard");
          setUserData(userData);
        })
        .catch((error) => {
          throw new Error(error);
        });
    },
    [router]
  );

  const getToken = useCallback(async () => {
    const u = await getCookie("userData");
    if (u) {
      setUserData(JSON.parse(u));
    }
  }, []);

  useEffect(() => {
    console.log("AuthContextWrapper useEffect");
    getToken();
  }, []);

  return (
    <AuthContext.Provider value={{ userData, saveUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  return useContext(AuthContext);
}
