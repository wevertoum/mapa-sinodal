"use client";
import { useDocument } from "@/hooks/firebase/useDocument";
import { Separator } from "@/components/ui/separator";
import useCollection from "@/hooks/firebase/useCollection";
import { HomeIcon } from "@heroicons/react/24/outline";
import ListBedroomsPick from "@/components/ListBedroomsPick";
import { Bed } from "lucide-react";
import { defaultTextColor } from "@/utils/constants";

interface CampingPageProps {
  params: {
    id_camp: string;
  };
}

export default function CampingPage({ params }: CampingPageProps) {
  const [camp] = useDocument<Models.Camp>(`camps/${params.id_camp}`);
  const [accommodations] = useCollection<Models.Accommodation>(
    "/accommodations",
    [{ field: "id_camp", value: params.id_camp }]
  );

  const sortedAccommodations = accommodations?.sort((a, b) =>
    a.name > b.name ? 1 : -1
  );

  return (
    <div className="flex flex-col space-y-4 p-4">
      <h1 className={`text-2xl font-bold ${defaultTextColor}`}>
        {camp ? camp.name : "Carregando..."} - Realizar reserva de quarto
      </h1>
      <Separator className="my-4 bg-slate-500" />

      <div>
        <div className="flex items-center my-2">
          <div className="h-4 w-4 flex justify-center items-center rounded-md bg-green-500 mr-2">
            <Bed size={10} />
          </div>
          <span className={defaultTextColor}>Quarto Disponível</span>
        </div>
        <div className="flex items-center my-2">
          <div className="h-4 w-4 flex justify-center items-center rounded-md bg-red-400 mr-2">
            <Bed size={10} />
          </div>
          <span className={defaultTextColor}>Quarto Ocupado</span>
        </div>
      </div>
      <Separator className="my-4 bg-slate-500" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedAccommodations?.map((accommodation) => (
          <div
            key={accommodation.id}
            className={
              "border rounded-lg p-4 flex flex-col justify-between items-center dark:bg-gray-600"
            }
          >
            <div className="flex items-center space-x-4">
              <h2 className={`text-xl font-bold ${defaultTextColor}`}>
                {accommodation.name}
              </h2>
              <HomeIcon className={`h-6 w-6 ${defaultTextColor}`} />
            </div>
            <ListBedroomsPick
              id_camp={params.id_camp}
              accomodation={accommodation}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
