"use client";
import FormCamp from "@/components/FormCamp";
import useCollection from "@/hooks/firebase/useCollection";
import { useCallback, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import ListCamps from "@/components/ListCamps";
import { useRouter } from "next/navigation";
import { defaultButton } from "@/utils/constants";
import { EmptyContent } from "@/components/EmptyContent";
import { Button } from "@/components/ui/button";

export default function CampsPage() {
  const [camps, { add, remove }] = useCollection<Models.Camp>("/camps");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const addCamp = useCallback(
    async (camp: Models.Camp) => {
      try {
        await add(camp).then(() => setOpen(false));
        return;
      } catch (error) {
        console.error("Erro ao adicionar acampamento: ", error);
      }
    },
    [add]
  );

  const navigate = useCallback(
    (id: string) => {
      router.push(`/dashboard/camps/${id}/`);
    },
    [router]
  );

  return (
    <div className="flex flex-col space-y-4">
      {camps && camps?.length > 0 && (
        <ListCamps camps={camps} onRemove={remove} onDetail={navigate} />
      )}

      {camps?.length === 0 && (
        <EmptyContent label="Sem acampamentos cadastrados" />
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <div className="flex justify-start">
          <Button className={defaultButton}>
            <DialogTrigger onClick={() => setOpen(true)}>
              Cadastrar acampamento
            </DialogTrigger>
          </Button>
        </div>
        <DialogContent>
          <FormCamp onSubmit={addCamp} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
