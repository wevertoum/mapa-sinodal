import React from "react";
import signUp from "@/firebase/signup";
import signIn from "@/firebase/signin";
import useCustomError from "@/hooks/useCustomError";
import { UserCredential } from "firebase/auth";
import FormLogin from "./FormLogin";

interface Props {
  onFinish: (data: UserCredential | null) => void;
  method: "signIn" | "signUp";
}

const Authenticate: React.FC<Props> = ({ onFinish, method }) => {
  const { showError, ErrorComponent } = useCustomError();

  const authFunctions = {
    signIn,
    signUp,
  };

  const labels = {
    signIn: "Login",
    signUp: "Criar usuário",
  };

  const handleForm = async (values: Models.Login) => {
    const targetFunction = authFunctions[method];
    const { result, error } = await targetFunction(values);
    if (error) {
      showError(JSON.stringify(error, null, 2));
      return;
    }
    return onFinish(result);
  };

  return (
    <>
      <ErrorComponent />
      <FormLogin
        title={labels[method]}
        onSubmit={(values) => handleForm(values)}
      />
    </>
  );
};

export default Authenticate;
