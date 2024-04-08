import { Bed } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";

interface BedItemPickProps {
  available: boolean;
  bedNumber: number;
  onSelect?: () => void;
}

export const BedItemPick = ({
  available,
  bedNumber,
  onSelect,
}: BedItemPickProps) => {

  const onClick = () => {};
  return (
    <>
      <div
        className={`h-4 w-4 flex justify-center items-center rounded-md cursor-pointer ${
          available ? "bg-green-500" : "bg-red-400"
        }`}
        onClick={onClick}
      >
        <Bed key={bedNumber} size={10} />
      </div>
    </>
  );
};
