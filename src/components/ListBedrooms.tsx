import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "./ui/button";
import { labelsGender } from "@/utils/labelsGender";
import { sortBy } from "lodash";

interface ListBedroomsProps {
  bedrooms: Models.Bedroom[] | null;
  onRemove: (id: string) => void;
}

const ListBedrooms = ({ bedrooms, onRemove }: ListBedroomsProps) => {
  const sortedBedrooms = sortBy(bedrooms, ["sequence"]);

  return (
    <div className="mt-8">
      {sortedBedrooms?.map((bedroom) => (
        <div
          key={bedroom.id}
          className="border rounded-lg p-4 mb-4 flex justify-between items-center dark:bg-gray-600"
        >
          <div>
            <h2 className="text-xl text-gray-400 dark:text-white font-bold">
              {bedroom.name}
            </h2>
            <p className="text-gray-400 dark:text-white">
              Capacidade: {bedroom.capacity}
            </p>
            <p className="text-gray-400 dark:text-white">
              Gênero permitido: {labelsGender[bedroom.gender]}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => onRemove(bedroom.id)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <XMarkIcon className="w-6 h-6" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListBedrooms;
