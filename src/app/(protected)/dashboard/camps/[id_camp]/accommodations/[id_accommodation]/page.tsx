"use client";
import React from "react";
import { useDocument } from "@/hooks/firebase/useDocument";
import Bedrooms from "@/components/Bedrooms";
import { defaultTextColor } from "@/utils/constants";

interface DetailAccommodation {
  params: {
    id_camp: string;
    id_accommodation: string;
  };
}

export default function DetailAccommodation({ params }: DetailAccommodation) {
  const [accommodation] = useDocument<Models.Accommodation>(
    `accommodations/${params.id_accommodation}`
  );

  return (
    <div className="flex flex-col space-y-4 mt-8">
      <h1 className={`text-2xl font-bold ${defaultTextColor}`}>
        {accommodation ? accommodation.name : "Carregando..."}
      </h1>
      {accommodation ? (
        <div>
          <h2 className={`text-lg font-semibold mb-4 ${defaultTextColor}`}>
            Quartos do alojamento: {accommodation.name}
          </h2>
          <Bedrooms
            id_accommodation={params.id_accommodation}
            id_camp={params.id_camp}
          />
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}
