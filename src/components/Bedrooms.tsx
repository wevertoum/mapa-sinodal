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
import SampleJson from "./SampleJson";

interface BedroomsProps {
  id_accommodation: string;
  id_camp: string;
}

const Bedrooms = ({ id_accommodation, id_camp }: BedroomsProps) => {
  const [open, setOpen] = useState(false);
  const [openMassiveBedrooms, setOpenMassiveBedrooms] = useState(false);
  const [jsonInput, setJsonInput] = useState("");

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
          sequence: bedrooms?.length ? bedrooms.length + 1 : 1,
        }).then(() => setOpen(false));
        return;
      } catch (error) {
        console.error("Erro ao adicionar quarto: ", error);
      }
    },
    [bedrooms, add, id_camp]
  );

  const handleMassiveAdd = useCallback(async () => {
    try {
      const currentSequence = bedrooms?.length || 0;
      const parsedData = JSON.parse(jsonInput) as Omit<
        Models.Bedroom,
        "id_accommodation" | "id_camp"
      >[];
      const bedroomsWithIds = parsedData.map((bedroom, sequence) => ({
        ...bedroom,
        id_accommodation,
        id_camp,
        sequence: currentSequence + sequence + 1,
      }));

      await Promise.all(bedroomsWithIds.map((bedroom) => add(bedroom)));
      setOpenMassiveBedrooms(false);
    } catch (error) {
      console.error("Erro ao adicionar quartos: ", error);
    }
  }, [jsonInput, id_accommodation, id_camp, bedrooms, add]);

  return (
    <>
      {bedrooms && bedrooms?.length > 0 && (
        <ListBedrooms bedrooms={bedrooms} onRemove={remove} />
      )}

      {bedrooms?.length === 0 && (
        <EmptyContent label="Sem quartos cadastrados" />
      )}

      {accommodation && (
        <>
          <div className="flex justify-start gap-6">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className={defaultButton}>Cadastrar um quarto</Button>
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

            <Dialog
              open={openMassiveBedrooms}
              onOpenChange={setOpenMassiveBedrooms}
            >
              <DialogTrigger asChild>
                <Button className={defaultButton}>Cadastro Massivo</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <h3>Cadastro Massivo de Quartos</h3>
                </DialogHeader>
                <SampleJson onChange={setJsonInput} />
                <Button onClick={handleMassiveAdd} className="mt-4">
                  Cadastrar Quartos
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        </>
      )}
    </>
  );
};

export default Bedrooms;
