"use client";
import React, { useEffect } from "react";
import useCollection from "@/hooks/firebase/useCollection";

interface Props {
  id_camp: string;
  id_accomodation: string;
  id_bedroom: string;
}
const ShortListMembers: React.FC<Props> = ({
  id_camp,
  id_accomodation,
  id_bedroom,
}) => {
  const [members] = useCollection<Models.Member>("/members", [
    { field: "id_camp", value: id_camp, operator: "==" },
    { field: "id_accomodation", value: id_accomodation, operator: "==" },
    { field: "id_bedroom", value: id_bedroom, operator: "==" },
  ]);

  return (
    <>
      <button onClick={() => console.log(members)}>Listar</button>
    </>
  );
};

export default ShortListMembers;
