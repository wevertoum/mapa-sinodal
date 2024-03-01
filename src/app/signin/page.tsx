"use client";
import React from "react";
import Authenticate from "@/components/Authenticate";
import { useAuthContext } from "@/contexts/AuthContext";

interface SignInPageProps {
  params: {};
}

export default function SignInPage({ params }: SignInPageProps) {
  const { saveToken } = useAuthContext();

  return (
    <div className="flex justify-center items-center">
      <Authenticate
        method="signIn"
        onFinish={async (result) => {
          const tokenUser = await result?.user?.getIdToken();
          if (tokenUser) {
            saveToken(tokenUser);
          }
        }}
      />
    </div>
  );
}
