import useCollection from "@/hooks/firebase/useCollection";
import _ from "lodash";
import { ManIcon } from "./icons/ManIcon";
import { WomanIcon } from "./icons/WomanIcon";
import { useTheme } from "next-themes";
import BedsList from "./BedsList";

interface ListBedroomsPickProps {
  id_accommodation: string;
}

const ListBedroomsPick = ({ id_accommodation }: ListBedroomsPickProps) => {
  const [bedrooms] = useCollection<Models.Bedroom>(
    "/bedrooms",
    "id_accommodation",
    id_accommodation
  );
  const { theme } = useTheme();

  const sortedBedrooms = _.sortBy(bedrooms, "sequence");

  return (
    <div className="mt-8 grid grid-cols-3 gap-2">
      {sortedBedrooms?.map((bedroom) => (
        <div
          key={bedroom.id}
          className={`border-2 rounded-lg p-4 flex justify-center items-start dark:bg-gray-600 ${
            bedroom.gender === "M" ? "border-blue-500" : "border-pink-500"
          }`}
        >
          <div className="flex flex-col justify-start items-center">
            <div className="flex gap-2 items-center">
              {bedroom.gender === "M" ? (
                <ManIcon
                  size={24}
                  color={theme === "dark" ? "white" : "black"}
                />
              ) : (
                <WomanIcon
                  size={24}
                  color={theme === "dark" ? "white" : "black"}
                />
              )}
              <p className="text-gray-400 dark:text-white text-sm">
                {bedroom.name}
              </p>
            </div>
            <BedsList id_bedroom={bedroom.id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListBedroomsPick;
