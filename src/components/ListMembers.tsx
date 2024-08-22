"use client";

import { useMemo } from "react";
import { groupMembers } from "@/utils/groupMembers";
import ListManageMembers from "./ListManageMembers";

interface ListMembersProps {
  members: Models.Member[];
  onRemove: (id: string) => void;
}

const ListMembers = ({ members, onRemove }: ListMembersProps) => {
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
                    onRemove={onRemove}
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
