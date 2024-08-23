import React, { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Bed } from "lucide-react";
import { useDocument } from "@/hooks/firebase/useDocument";
import { labelsGender } from "@/utils/labelsGender";
import useCollection from "@/hooks/firebase/useCollection";

interface ItemRoomFeedbackProps {
  id_bedroom: string;
}

const ItemRoomFeedback = ({ id_bedroom }: ItemRoomFeedbackProps) => {
  const fullRoom = false;
  const [bedroom] = useDocument<Models.Bedroom>(`/bedrooms/${id_bedroom}`);
  const [beds] = useCollection<Models.Bed>("/beds", [
    { field: "id_bedroom", value: id_bedroom },
  ]);

  const fullBedroom = useMemo(() => {
    return bedroom?.capacity === beds?.length;
  }, [bedroom, beds]);

  return (
    <>
      {bedroom && bedroom.gender && (
        <div
          className={`border-${
            labelsGender[bedroom.gender || "M"].color
          } border-4 rounded-full m-2 px-2`}
        >
          {labelsGender[bedroom.gender || "M"].label}
        </div>
      )}
      {fullBedroom && (
        <Badge variant="destructive" className="h-8">
          <div className="h-4 w-4 flex justify-center items-center mr-2">
            <Bed size={16} />
          </div>
          Quarto cheio
        </Badge>
      )}
    </>
  );
};

export default ItemRoomFeedback;
