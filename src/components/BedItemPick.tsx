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
  const { toast } = useToast();

  const onClick = () => {
    if (available) {
      onSelect && onSelect();
    } else {
      toast({
        title: "Cama não disponível",
        description: "Escollha outra cama",
      });
    }
  };
  return (
    <>
      <div
        className={`bg-green-500 h-6 w-6 flex justify-center items-center rounded-md cursor-pointer`}
        onClick={onClick}
      >
        <Bed key={bedNumber} size={10} />
      </div>
      <Toaster />
    </>
  );
};
