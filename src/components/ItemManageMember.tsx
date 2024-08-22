"use client";
import { XCircleIcon, ForwardIcon } from "@heroicons/react/24/outline";
import { useCallback, useState } from "react";
import { formatCpf } from "@/utils/formatCpf";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import PopConfirm from "./PopConfirm";
import useCollection from "@/hooks/firebase/useCollection";
import MoveMemberContent from "./MoveMemberContent";

interface ItemManageMemberProps {
  member: Models.Member;
  remove: (id: string) => Promise<void>;
  id_camp: string;
}

const ItemManageMember = ({
  member,
  remove,
  id_camp,
}: ItemManageMemberProps) => {
  const [beds, { remove: removeBed }] = useCollection<Models.Bed>("/beds", [
    { field: "id_member", value: member.id },
  ]);

  const removeMemberAndBed = useCallback(
    async (id: string) => {
      if (beds && beds[0].id) {
        await removeBed(beds[0].id);
        await remove(id);
      }
    },
    [remove, removeBed, beds]
  );
  const [openTransfer, setOpenTransfer] = useState(false);

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="px-6 py-4 w-1/4">{member.name}</td>
      <td className="px-6 py-4 w-1/4">{member.age}</td>
      <td className="px-6 py-4 w-1/4">{formatCpf(member.cpf)}</td>
      <td className="px-6 py-4 w-1/4">
        <div className="flex space-x-2">
          <PopConfirm
            onConfirm={() => removeMemberAndBed(member.id)}
            title="Tem certeza?"
            description={`Você deseja remover o acampante ${member.name}?`}
          >
            <XCircleIcon className="h-5 w-5 text-red-500 cursor-pointer" />
          </PopConfirm>
          <Dialog open={openTransfer} onOpenChange={setOpenTransfer}>
            <div className="flex justify-start">
              <DialogTrigger onClick={() => setOpenTransfer(true)}>
                <ForwardIcon className="h-5 w-5 text-blue-500 cursor-pointer" />
              </DialogTrigger>
            </div>
            <DialogContent>
              <DialogHeader>
                <h3>Transferir acampante {member.name}</h3>
              </DialogHeader>
              <MoveMemberContent
                member={member}
                id_camp={id_camp}
                onTransferSuccess={() => setOpenTransfer(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </td>
    </tr>
  );
};

export default ItemManageMember;
