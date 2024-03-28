"use client";
import FormCamp from "@/components/FormCamp";
import useCollection from "@/hooks/firebase/useCollection";
import { useCallback, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

import ListCamps from "@/components/ListCamps";
import { useRouter } from "next/navigation";

export default function CampsPage() {
  const [camps, { add, remove }] = useCollection<Models.Camp>("camps");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const addCamp = useCallback(async (camp: Models.Camp) => {
    try {
      await add(camp).then(() => setOpen(false));
      return;
    } catch (error) {
      console.error("Erro ao adicionar acampamento: ", error);
    }
  }, []);

  const navigate = useCallback((id: string) => {
    router.push(`/dashboard/camps/${id}/`);
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      <ListCamps camps={camps} onRemove={remove} onDetail={navigate} />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          onClick={() => setOpen(true)}
          className="text-gray-400 dark:text-white"
        >
          Cadastrar acampamento
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <FormCamp onSubmit={addCamp} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
