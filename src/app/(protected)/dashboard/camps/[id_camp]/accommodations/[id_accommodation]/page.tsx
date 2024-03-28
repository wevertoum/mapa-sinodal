"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useDocument } from "@/hooks/firebase/useDocument";
import Accommodations from "@/components/Accommodations";
import Bedrooms from "@/components/Bedrooms";

export default function DetailAccommodation() {
  const { id_accommodation, id_camp } = useParams();
  const [accommodation] = useDocument<Models.Accommodation>(
    `accommodations/${id_accommodation}`
  );

  return (
    <div className="flex flex-col space-y-4 mt-8">
      <h1 className="text-2xl font-bold text-gray-400 dark:text-white">
        {accommodation ? accommodation.name : "Carregando..."}
      </h1>
      {accommodation ? (
        <div>
          <h2 className="text-lg font-semibold text-gray-400 dark:text-white mb-4">
            Dados do alojamento: {accommodation.name}
          </h2>
          <Bedrooms
            id_accommodation={id_accommodation as string}
            id_camp={id_camp as string}
          />
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}
