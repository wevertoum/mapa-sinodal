"use client";
import React from "react";
import Authenticate from "@/components/Authenticate";
import { useAuthContext } from "@/contexts/AuthContext";

interface SignInPageProps {
  params: {};
}

export default function SignInPage({ params }: SignInPageProps) {
  const { saveUserData } = useAuthContext();

  return (
    <div className="flex justify-center items-center">
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
    </div>
  );
}
