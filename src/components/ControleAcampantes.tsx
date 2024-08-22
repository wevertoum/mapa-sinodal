"use client";

import useCollection from "@/hooks/firebase/useCollection";
import ListMembers from "./ListMembers";

interface ControleAcampantesProps {
  id_camp: string;
}

const ControleAcampantes = ({ id_camp }: ControleAcampantesProps) => {
  const [members, { remove }] = useCollection<Models.Member>("/members", [
    { field: "id_camp", value: id_camp },
  ]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Relatório de acampantes alojados
      </h2>
      {members && members?.length > 0 && (
        <ListMembers members={members} onRemove={remove} />
      )}
    </div>
  );
};

export default ControleAcampantes;
