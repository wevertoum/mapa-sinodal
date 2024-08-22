"use client";
import ItemManageMember from "./ItemManageMember";

interface ListManageMembersProps {
  members: Models.Member[];
  onRemove: (id: string) => void;
}

const ListManageMembers = ({ members, onRemove }: ListManageMembersProps) => {
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
              onRemove={onRemove}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListManageMembers;
