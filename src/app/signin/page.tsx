"use client";
import React from "react";
import signIn from "@/firebase/signin";
import { useRouter } from "next/navigation";
import Authenticate from "@/components/Authenticate";

interface SignInPageProps {
  params: {};
}

export default function SignInPage({ params }: SignInPageProps) {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center">
      <Authenticate
        method="signIn"
        onFinish={() => {
          router.push("/admin");
        }}
      />
    </div>
  );
}
