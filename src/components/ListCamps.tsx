import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "./ui/button";
import { defaultButton, defaultTextColor } from "@/utils/constants";

interface ListCampsProps {
  label?: string;
  camps: Models.Camp[] | null;
  onRemove?: (id: string) => void;
  onDetail?: (id: string) => void;
}

const ListCamps = ({
  camps,
  onRemove,
  onDetail,
  label = "Gerenciar",
}: ListCampsProps) => {
  return (
    <div className="mt-8">
      {camps?.map((camp) => (
        <div
          key={camp.id}
          className="border rounded-lg p-4 mb-4 flex justify-between items-center dark:bg-gray-600"
        >
          <div>
            <h2 className={`text-xl font-bold ${defaultTextColor}`}>
              {camp.name}
            </h2>
            <p className={defaultTextColor}>Data: {camp.date}</p>
          </div>

          <div className="flex items-center space-x-4">
            {onDetail && (
              <Button
                onClick={() => onDetail(camp.id)}
                className={defaultButton}
              >
                {label}
              </Button>
            )}
            {onRemove && (
              <Button
                onClick={() => onRemove(camp.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                <XMarkIcon className="w-6 h-6" />
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListCamps;
