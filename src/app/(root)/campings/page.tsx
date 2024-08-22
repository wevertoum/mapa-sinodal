"use client";
import DisplayContent from "@/components/DisplayContent";
import useCollection from "@/hooks/firebase/useCollection";
import { useRouter } from "next/navigation";
import ListCamps from "@/components/ListCamps";
import { useCallback } from "react";

interface CampingsPageProps {}

export default function CampingsPage({}: CampingsPageProps) {
  const [camps] = useCollection<Models.Camp>("/camps");

  const router = useRouter();
  const navigate = useCallback(
    (id: string) => {
      router.push(`/campings/${id}/`);
    },
    [router]
  );

  return (
    <DisplayContent>
      <div className="flex flex-col items-center justify-center space-y-10 mt-28">
        <div className="flex flex-col items-center space-y-6">
          <h1 className="max-w-3xl text-center font-bold text-gray-900 dark:text-white text-5xl leading-tight">
            ACAMPAMENTOS CADASTRADOS
          </h1>
        </div>
      </div>
      {camps && (
        <ListCamps
          camps={camps}
          onDetail={navigate}
          label="Fazer reserva de quarto"
        />
      )}
    </DisplayContent>
  );
}
