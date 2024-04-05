"use client";
import React from "react";
import { useDocument } from "@/hooks/firebase/useDocument";
import Accommodations from "@/components/Accommodations";

interface DetailCampPage {
  params: {
    id_camp: string;
  };
}

export default function DetailCampPage({ params }: DetailCampPage) {
  const [camp] = useDocument<Models.Camp>(`camps/${params.id_camp}`);

  return (
    <div className="flex flex-col space-y-4 mt-8">
      <h1 className="text-2xl font-bold text-gray-400 dark:text-white">
        {camp ? camp.name : "Carregando..."}
      </h1>
      {camp ? (
        <div>
          <h2 className="text-lg font-semibold text-gray-400 dark:text-white mb-4">
            Data: {camp.date}
          </h2>
          <Accommodations id_camp={camp.id} />
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}
