import _ from "lodash";
import { useDocument } from "@/hooks/firebase/useDocument";
import { BedItemPick } from "./BedItemPick";

interface BedsListProps {
  id_bedroom: string;
}

const BedsList = ({ id_bedroom }: BedsListProps) => {
  const [bedroom] = useDocument<Models.Bedroom>(`/bedrooms/${id_bedroom}`);

  const bedsArray = Array.from(
    { length: bedroom?.capacity || 0 },
    (_, index) => index + 1
  );

  return (
    <div className="mt-2 grid grid-cols-4 gap-1">
      {bedsArray.map((bedNumber, i) => (
        <BedItemPick
          key={i}
          available={false}
          bedNumber={bedNumber}
          onSelect={() => {}}
        />
      ))}
    </div>
  );
};

export default BedsList;
