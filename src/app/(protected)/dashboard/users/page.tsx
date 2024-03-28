"use client";
import Authenticate from "@/components/Authenticate";

export default function UsersPage() {
  return (
    <>
      <h1 className="text-3xl mb-6 text-center">Cadastrar usuário</h1>
      <Authenticate
        method="signUp"
        onFinish={() => {
          alert("Usuário criado com sucesso!");
        }}
      />
    </>
  );
}
