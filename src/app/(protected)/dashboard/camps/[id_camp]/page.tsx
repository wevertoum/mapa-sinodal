"use client";
import React from "react";
import { useDocument } from "@/hooks/firebase/useDocument";
import Accommodations from "@/components/Accommodations";
import { defaultTextColor } from "@/utils/constants";

interface DetailCampPage {
  params: {
    id_camp: string;
  };
}

export default function DetailCampPage({ params }: DetailCampPage) {
  const [camp] = useDocument<Models.Camp>(`camps/${params.id_camp}`);

  return (
    <div className="flex flex-col space-y-4 mt-8">
      <h1 className={`text-2xl font-bold ${defaultTextColor}`}>
        {camp ? camp.name : "Carregando..."}
      </h1>
      {camp ? (
        <div>
          <h2 className={`text-lg font-semibold mb-4 ${defaultTextColor}`}>
            Data: {camp.date}
          </h2>
          <Accommodations id_camp={params.id_camp} />
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}
