import useCollection from "@/hooks/firebase/useCollection";
import { DocumentIcon } from "@heroicons/react/24/outline";

import { useCallback, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormAccommodation from "./FormAccommodation";
import ListBedrooms from "./ListBedrooms";
import FormBedroom from "./FormBedroom";
import { useDocument } from "@/hooks/firebase/useDocument";

interface BedroomsProps {
  id_accommodation: string;
  id_camp: string;
}

const Bedrooms = ({ id_accommodation, id_camp }: BedroomsProps) => {
  const [open, setOpen] = useState(false);
  const [bedrooms, { add, remove }] = useCollection<Models.Bedroom>(
    `/bedrooms`,
    "id_accommodation",
    id_accommodation
  );

  const [accommodation] = useDocument<Models.Accommodation>(
    `/accommodations/${id_accommodation}`
  );

  const addBedroom = useCallback(
    async (bedroom: Models.Bedroom) => {
      try {
        await add({
          ...bedroom,
          id_camp,
          visibleNumber: bedrooms!.length + 1,
        }).then(() => setOpen(false));
        return;
      } catch (error) {
        console.error("Erro ao adicionar acomodação: ", error);
      }
    },
    [accommodation]
  );

  return (
    <>
      {bedrooms && bedrooms?.length > 0 ? (
        <ListBedrooms bedrooms={bedrooms} onRemove={remove} />
      ) : (
        <div className="border rounded-lg p-4 mb-4 dark:bg-red-300 flex items-center">
          <DocumentIcon className="w-5 h-w-5 text-red-500 mr-4" />
          <p className="text-black font-bold">Sem quartos cadastrados</p>
        </div>
      )}

      {accommodation && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger
            onClick={() => setOpen(true)}
            className="text-gray-400 dark:text-white"
          >
            Cadastrar quarto
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <FormBedroom
                onSubmit={addBedroom}
                id_accommodation={id_accommodation}
                id_camp={accommodation.id_camp}
              />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default Bedrooms;
