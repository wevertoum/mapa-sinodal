"use client";
import { useDocument } from "@/hooks/firebase/useDocument";
import { Separator } from "@/components/ui/separator";
import useCollection from "@/hooks/firebase/useCollection";
import { HomeIcon } from "@heroicons/react/24/outline";
import ListBedroomsPick from "@/components/ListBedroomsPick";

interface CampingPageProps {
  params: {
    id_camp: string;
  };
}

export default function CampingPage({ params }: CampingPageProps) {
  const [camp] = useDocument<Models.Camp>(`camps/${params.id_camp}`);
  const [accommodations] = useCollection<Models.Accommodation>(
    "/accommodations",
    "id_camp",
    params.id_camp
  );

  const sortedAccommodations = accommodations?.sort((a, b) =>
    a.name > b.name ? 1 : -1
  );

  return (
    <div className="flex flex-col space-y-4 p-4">
      <h1 className="text-2xl font-bold text-gray-400 dark:text-white">
        {camp ? camp.name : "Carregando..."} - Alojamentos
      </h1>
      <Separator className="my-4 bg-slate-500" />
      <p className="text-gray-400 dark:text-white">
        Escolha um quarto em um determinado alojamento e faça a reserva
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedAccommodations?.map((accommodation) => (
          <div
            key={accommodation.id}
            className={
              "border rounded-lg p-4 flex flex-col justify-between items-center dark:bg-gray-600"
            }
          >
            <div className="flex items-center space-x-4">
              <h2 className="text-xl text-gray-400 dark:text-white font-bold">
                {accommodation.name}
              </h2>
              <HomeIcon className="h-6 w-6 text-gray-400 dark:text-white" />
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
