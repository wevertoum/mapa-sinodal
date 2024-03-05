"use client";
import Authenticate from "@/components/Authenticate";

interface UsersPageProps {
  params: {};
}

export default function UsersPage({ params }: UsersPageProps) {
  return (
    <>
      <h1 className="text-3xl mb-6 text-center">Sign Up</h1>

      <Authenticate
        method="signUp"
        onFinish={() => {
          alert("Usuário criado com sucesso!");
        }}
      />
    </>
  );
}
