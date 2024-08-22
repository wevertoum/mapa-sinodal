"use client";
import ItemManageMember from "./ItemManageMember";

interface ListManageMembersProps {
  members: Models.Member[];
  remove: (id: string) => Promise<void>;
  id_camp: string;
}

const ListManageMembers = ({
  members,
  remove,
  id_camp,
}: ListManageMembersProps) => {
  return (
    <div>
      <table className="w-full p-4 text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 w-1/4 py-3">
              Nome
            </th>
            <th scope="col" className="px-6 w-1/4 py-3">
              Idade
            </th>
            <th scope="col" className="px-6 w-1/4 py-3">
              CPF
            </th>
            <th scope="col" className="px-6 w-1/4 py-3">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <ItemManageMember
              key={member.id}
              member={member}
              remove={remove}
              id_camp={id_camp}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListManageMembers;
