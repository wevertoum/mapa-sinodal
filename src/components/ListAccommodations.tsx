import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "./ui/button";

interface ListAccommodationsProps {
  accommodations: Models.Accommodation[] | null;
  onRemove: (id: string) => void;
  onDetail: (id: string) => void;
}

const ListAccommodations = ({
  accommodations,
  onRemove,
  onDetail,
}: ListAccommodationsProps) => {
  return (
    <div className="mt-8">
      {accommodations?.map((accommodation) => (
        <div
          key={accommodation.id}
          className="border rounded-lg p-4 mb-4 flex justify-between items-center dark:bg-gray-600"
        >
          <div>
            <h2 className="text-xl text-gray-400 dark:text-white font-bold">
              {accommodation.name}
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => onDetail(accommodation.id)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Gerenciar quartos
            </Button>
            <Button
              onClick={() => onRemove(accommodation.id)}
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

export default ListAccommodations;
