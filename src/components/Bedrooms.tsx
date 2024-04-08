import useCollection from "@/hooks/firebase/useCollection";

import { useCallback, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import ListBedrooms from "./ListBedrooms";
import FormBedroom from "./FormBedroom";
import { useDocument } from "@/hooks/firebase/useDocument";
import { defaultButton } from "@/utils/constants";
import { EmptyContent } from "./EmptyContent";
import { Button } from "./ui/button";

interface BedroomsProps {
  id_accommodation: string;
  id_camp: string;
}

const Bedrooms = ({ id_accommodation, id_camp }: BedroomsProps) => {
  const [open, setOpen] = useState(false);
  const [bedrooms, { add, remove }] = useCollection<Models.Bedroom>(
    "/bedrooms",
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
          sequence: bedrooms?.length || 0 + 1,
        }).then(() => setOpen(false));
        return;
      } catch (error) {
        console.error("Erro ao adicionar quarto: ", error);
      }
    },
    [accommodation]
  );

  const quartosMock = [
    {
      sequence: 1,
      capacity: 8,
      gender: "M",
      id_accommodation,
      id_camp,
      name: "Quarto 1",
    },
    {
      sequence: 2,
      capacity: 10,
      gender: "F",
      id_accommodation,
      id_camp,
      name: "Quarto 2",
    },
    {
      sequence: 3,
      capacity: 8,
      gender: "F",
      id_accommodation,
      id_camp,
      name: "Quarto 3",
    },
    {
      sequence: 4,
      capacity: 10,
      gender: "M",
      id_accommodation,
      id_camp,
      name: "Quarto 4",
    },
    {
      sequence: 5,
      capacity: 8,
      gender: "M",
      id_accommodation,
      id_camp,
      name: "Quarto 5",
    },
    {
      sequence: 6,
      capacity: 10,
      gender: "F",
      id_accommodation,
      id_camp,
      name: "Quarto 6",
    },
    {
      sequence: 7,
      capacity: 8,
      gender: "F",
      id_accommodation,
      id_camp,
      name: "Quarto 7",
    },
    {
      sequence: 8,
      capacity: 10,
      gender: "M",
      id_accommodation,
      id_camp,
      name: "Quarto 8",
    },
    {
      sequence: 9,
      capacity: 8,
      gender: "M",
      id_accommodation,
      id_camp,
      name: "Quarto 9",
    },
    {
      sequence: 10,
      capacity: 10,
      gender: "F",
      id_accommodation,
      id_camp,
      name: "Quarto 10",
    },
  ] as Models.Bedroom[];

  const massiveAdd = useCallback(async () => {
    try {
      await Promise.all(quartosMock.map((quarto) => add(quarto)));
    } catch (error) {
      console.error("Erro ao adicionar quarto: ", error);
    }
  }, [quartosMock]);

  return (
    <>
      {bedrooms && bedrooms?.length > 0 && (
        <ListBedrooms bedrooms={bedrooms} onRemove={remove} />
      )}

      {bedrooms?.length === 0 && (
        <EmptyContent label="Sem quartos cadastrados" />
      )}

      {/* <Button onClick={massiveAdd} className={defaultButton}>
        Cadastro Massivo
      </Button> */}

      {accommodation && (
        <Dialog open={open} onOpenChange={setOpen}>
          <div className="flex justify-start">
            <Button className={defaultButton}>
              <DialogTrigger onClick={() => setOpen(true)}>
                Cadastrar quarto
              </DialogTrigger>
            </Button>
          </div>

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
