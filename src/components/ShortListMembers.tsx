"use client";
import React from "react";
import useCollection from "@/hooks/firebase/useCollection";

interface Props {
  id_camp: string;
  id_accommodation: string;
  id_bedroom: string;
}

const ShortListMembers: React.FC<Props> = ({
  id_camp,
  id_accommodation,
  id_bedroom,
}) => {
  const [members] = useCollection<Models.Member>("/members", [
    { field: "id_camp", value: id_camp },
    { field: "id_accommodation", value: id_accommodation },
    { field: "id_bedroom", value: id_bedroom },
  ]);

  return (
    <div className="relative overflow-x-auto">
      {members && members.length > 0 ? (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nome
              </th>
              <th scope="col" className="px-6 py-3">
                Idade
              </th>
              <th scope="col" className="px-6 py-3">
                Gênero
              </th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr
                key={member.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">{member.name}</td>
                <td className="px-6 py-4">{member.age}</td>
                <td className="px-6 py-4">{member.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
          Quarto vazio
        </div>
      )}
    </div>
  );
};

export default ShortListMembers;
