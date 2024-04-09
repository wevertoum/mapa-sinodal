"use client";

import { XCircleIcon, ForwardIcon } from "@heroicons/react/24/outline";
import { useMemo } from "react";
import { groupMembers } from "@/utils/groupMembers";
import { formatCpf } from "@/utils/formatCpf";
import PopConfirm from "./PopConfirm";

interface ListMembersProps {
  members: Models.Member[];
  onRemove: (id: string) => void;
}

const ListMembers = ({ members, onRemove }: ListMembersProps) => {
  const groupedMembers = useMemo(() => groupMembers(members), [members]);

  return (
    <div>
      {Object.entries(groupedMembers).map(
        ([accommodationId, accommodation]) => (
          <div
            className="mb-6 border p-4 rounded-lg shadow-md dark: border-gray-200 dark:bg-gray-800 dark:text-gray-100 text-gray-900"
            key={accommodationId}
          >
            <h2 className="text-2xl font-semibold mb-4">
              {accommodation.name_accommodation}
            </h2>
            {Object.entries(accommodation.bedrooms).map(
              ([bedroomId, bedroom]) => (
                <div className="mb-4" key={bedroomId}>
                  <h3 className="text-lg font-medium mb-4">
                    {bedroom.name_bedroom}
                  </h3>
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <colgroup>
                        <col style={{ width: "25%" }} />
                        <col style={{ width: "25%" }} />
                        <col style={{ width: "25%" }} />
                        <col style={{ width: "25%" }} />
                      </colgroup>
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            Acampante
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Idade
                          </th>
                          <th scope="col" className="px-6 py-3">
                            CPF
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {bedroom.members.map((member) => (
                          <tr
                            key={member.id}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                          >
                            <td className="px-6 py-4">{member.name}</td>
                            <td className="px-6 py-4">{member.age}</td>
                            <td className="px-6 py-4">
                              {formatCpf(member.cpf)}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex space-x-2">
                                <PopConfirm
                                  onConfirm={() => onRemove(member.id)}
                                  title="Tem certeza?"
                                  description={`Você deseja remover o acampante ${member.name}?`}
                                >
                                  <XCircleIcon className="h-5 w-5 text-red-500 cursor-pointer" />
                                </PopConfirm>
                                <ForwardIcon className="h-5 w-5 text-blue-500 cursor-pointer" />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )
            )}
          </div>
        )
      )}
    </div>
  );
};

export default ListMembers;
