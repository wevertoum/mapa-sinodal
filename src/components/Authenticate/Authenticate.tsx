import React from "react";
import signUp from "@/firebase/signup";
import signIn from "@/firebase/signin";
import useCustomError from "@/hooks/useCustomError";
import { UserCredential } from "firebase/auth";
import { Button } from "../ui/button";
import { darkWhiteText } from "@/utils/pattern-classnames";

interface Props {
  onFinish: (data: UserCredential | null) => void;
  method: "signIn" | "signUp";
}

const Authenticate: React.FC<Props> = ({ onFinish, method }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { showError, ErrorComponent } = useCustomError();

  const authFunctions = {
    signIn,
    signUp,
  };

  const labels = {
    signIn: "Fazer login",
    signUp: "Criar usuário",
  };

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const targetFunction = authFunctions[method];
    const { result, error } = await targetFunction(email, password);
    if (error) {
      showError(JSON.stringify(error, null, 2));
      return;
    }
    return onFinish(result);
  };

  return (
    <div className="p-8">
      <ErrorComponent />
      <h1 className={`text-3xl mb-6 text-center ${darkWhiteText}`}>
        {labels[method]}
      </h1>
      <form onSubmit={handleForm} className="space-y-4">
        <div>
          <label htmlFor="email" className={`text-lg block ${darkWhiteText}`}>
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            name="email"
            id="email"
            placeholder="example@mail.com"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className={`text-lg block ${darkWhiteText}`}
          >
            Senha
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            name="password"
            id="password"
            placeholder="password"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          {labels[method]}
        </Button>
      </form>
    </div>
  );
};

export default Authenticate;
