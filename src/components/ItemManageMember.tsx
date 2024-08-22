"use client";
import { XCircleIcon, ForwardIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { formatCpf } from "@/utils/formatCpf";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import PopConfirm from "./PopConfirm";

interface ItemManageMemberProps {
  member: Models.Member;
  onRemove: (id: string) => void;
}

const ItemManageMember = ({ member, onRemove }: ItemManageMemberProps) => {
  const [openTransfer, setOpenTransfer] = useState(false);

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="px-6 py-4 w-1/4">{member.name}</td>
      <td className="px-6 py-4 w-1/4">{member.age}</td>
      <td className="px-6 py-4 w-1/4">{formatCpf(member.cpf)}</td>
      <td className="px-6 py-4 w-1/4">
        <div className="flex space-x-2">
          <PopConfirm
            onConfirm={() => onRemove(member.id)}
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
            </DialogContent>
          </Dialog>
        </div>
      </td>
    </tr>
  );
};

export default ItemManageMember;
