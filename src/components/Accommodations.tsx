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

interface AccommodationsProps {
  id_camp: string;
}

const Accommodations = ({ id_camp }: AccommodationsProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [accommodations, { add, remove }] =
    useCollection<Models.Accommodation>(`/accommodations`);

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
      {accommodations && accommodations?.length > 0 ? (
        <ListAccommodations
          accommodations={accommodations}
          onRemove={remove}
          onDetail={navigate}
        />
      ) : (
        <div className="border rounded-lg p-4 mb-4 dark:bg-red-300 flex items-center">
          <DocumentIcon className="w-5 h-w-5 text-red-500 mr-4" />
          <p className="text-black font-bold">Sem alojamentos cadastrados</p>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          onClick={() => setOpen(true)}
          className="text-gray-400 dark:text-white"
        >
          Cadastrar acomodação
        </DialogTrigger>
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
