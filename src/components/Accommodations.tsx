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
import ListAccommodations from "./ListAccommodations";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { defaultButton } from "@/utils/constants";
import { EmptyContent } from "./EmptyContent";

interface AccommodationsProps {
  id_camp: string;
}

const Accommodations = ({ id_camp }: AccommodationsProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [accommodations, { add, remove }] = useCollection<Models.Accommodation>(
    "/accommodations",
    "id_camp",
    id_camp
  );

  const addCamp = useCallback(async (accommodation: Models.Accommodation) => {
    try {
      await add({ ...accommodation, id_camp }).then(() => setOpen(false));
      return;
    } catch (error) {
      console.error("Erro ao adicionar acomodação: ", error);
    }
  }, []);

  const navigate = useCallback(
    (id_accommodation: string) => {
      router.push(
        `/dashboard/camps/${id_camp}/accommodations/${id_accommodation}`
      );
    },
    [id_camp]
  );

  return (
    <>
      {accommodations && accommodations?.length > 0 && (
        <ListAccommodations
          accommodations={accommodations}
          onRemove={remove}
          onDetail={navigate}
        />
      )}

      {accommodations?.length === 0 && (
        <EmptyContent label="Sem alojamentos cadastrados" />
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <div className="flex justify-start">
          <Button className={defaultButton}>
            <DialogTrigger onClick={() => setOpen(true)} className="text-white">
              Cadastrar acomodação
            </DialogTrigger>
          </Button>
        </div>

        <DialogContent>
          <DialogHeader>
            <FormAccommodation onSubmit={addCamp} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Accommodations;
