"use client";
import FormCamp from "@/components/FormCamp";
import { Button } from "@/components/ui/button";
import useCollection from "@/hooks/firebase/useCollection";
import { useCallback, useState } from "react";

interface CampsPageProps {
  params: {};
}

export default function CampsPage({ params }: CampsPageProps) {
  const [camps, { add, remove }] = useCollection<Models.Camp>("camps");

  const addCamp = useCallback(async (camp: Models.Camp) => {
    try {
      await add(camp);
      return;
    } catch (error) {
      console.error("Erro ao adicionar acampamento: ", error);
    }
  }, []);

  return (
    <div className="flex flex-col space-y-4 w-[800px]">
      {camps?.map((camp) => (
        <div
          key={camp.id}
          className="border rounded-lg p-4 mb-4 flex justify-between items-center"
        >
          <div>
            <h2 className="text-xl font-bold">{camp.name}</h2>
            <p className="text-gray-600">Data: {camp.date}</p>
          </div>
          <Button
            onClick={() => remove(camp.id)}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            deletar acampamento
          </Button>
        </div>
      ))}
      <br />
      <FormCamp onSubmit={addCamp} />
    </div>
  );
}
