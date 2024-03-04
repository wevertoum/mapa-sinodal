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
  const [token, setToken] = useState<string>();

  const saveToken = useCallback(
    async (token: string) => {
      saveCookie("userToken", token)
        .then(() => {
          router.push("/protected/dashboard");
          setToken(token);
        })
        .catch((error) => {
          throw new Error(error);
        });
    },
    [router]
  );

  const getToken = useCallback(async () => {
    const t = await getCookie("userToken");
    if (t) {
      setToken(t);
    }
  }, []);

  useEffect(() => {
    console.log("AuthContextWrapper useEffect");
    getToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token, saveToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  return useContext(AuthContext);
}
