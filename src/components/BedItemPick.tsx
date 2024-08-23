import { Bed } from "lucide-react";

interface BedItemPickProps {
  available: boolean;
}

export const BedItemPick = ({ available }: BedItemPickProps) => {
  return (
    <>
      <div
        className={`h-4 w-4 flex justify-center items-center rounded-md ${
          available ? "bg-green-500" : "bg-red-400"
        }`}
      >
        <Bed size={10} />
      </div>
    </>
  );
};
