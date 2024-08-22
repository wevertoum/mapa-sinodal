"use client";
import React, { useEffect } from "react";
import Authenticate from "@/components/Authenticate";
import { useAuthContext } from "@/contexts/AuthContext";
import DisplayContent from "@/components/DisplayContent";

interface SignInPageProps {
  params: {};
}

export default function SignInPage({ params }: SignInPageProps) {
  const { saveUserData, verifyIsLogged } = useAuthContext();

  useEffect(() => {
    verifyIsLogged();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DisplayContent>
      <Authenticate
        method="signIn"
        onFinish={async (result) => {
          const user = result?.user?.toJSON();
          const token = await result?.user?.getIdToken();
          const userToSave = {
            email: (user as { email: string } | null)?.email,
            token,
          } as Models.UserData;
          if (userToSave) {
            saveUserData(userToSave);
          }
        }}
      />
    </DisplayContent>
  );
}
