"use client";

import { useMemo } from "react";
import { groupMembers } from "@/utils/groupMembers";
import ListManageMembers from "./ListManageMembers";

interface ListMembersProps {
  members: Models.Member[];
  remove: (id: string) => Promise<void>;
  id_camp: string;
}

const ListMembers = ({ members, remove, id_camp }: ListMembersProps) => {
  const groupedMembers = useMemo(
    () => groupMembers(members) as Models.AccommodationsMap,
    [members]
  );

  return (
    <div>
      {Object.entries(groupedMembers).map(
        ([accommodationId, accommodation]) => (
          <div key={accommodationId}>
            <h2 className="text-2xl font-semibold mb-4">
              {/* TODO: adicionar o feedback de quarto cheio para o adm */}
              {accommodation.name_accommodation}
            </h2>

            {Object.entries(accommodation.bedrooms).map(
              ([bedroomId, bedroom]) => (
                <div className="mb-4" key={bedroomId}>
                  <h3 className="text-lg font-medium mb-4">
                    {bedroom.name_bedroom}
                  </h3>
                  <ListManageMembers
                    members={bedroom.members}
                    remove={remove}
                    id_camp={id_camp}
                  />
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
