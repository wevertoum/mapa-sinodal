"use client";

import useCollection from "@/hooks/firebase/useCollection";
import ListMembers from "./ListMembers";

interface ControleAcampantesProps {
  id_camp: string;
}

const ControleAcampantes = ({ id_camp }: ControleAcampantesProps) => {
  const [members, { remove }] = useCollection<Models.Member>(
    "/members",
    "id_camp",
    id_camp
  );

  return (
    <div>
      {members && members?.length > 0 && (
        <ListMembers members={members} onRemove={remove} />
      )}
    </div>
  );
};

export default ControleAcampantes;
