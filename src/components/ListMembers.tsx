"use client";

import { useMemo } from "react";
import { groupMembers } from "@/utils/groupMembers";
import ListManageMembers from "./ListManageMembers";
import { defaultTextColor } from "@/utils/constants";
import ItemRoomFeedback from "./ItemRoomFeedback";

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
            <h2 className={`text-2xl font-semibold mb-4 ${defaultTextColor}`}>
              {accommodation.name_accommodation}
            </h2>

            {Object.entries(accommodation.bedrooms).map(
              ([bedroomId, bedroom]) => (
                <div className="mb-4" key={bedroomId}>
                  <div className="flex mb-4 w-fit items-center">
                    <h3
                      className={`text-lg font-medium mr-4 ${defaultTextColor}`}
                    >
                      Quarto: {bedroom.name_bedroom}
                    </h3>
                    <ItemRoomFeedback id_bedroom={bedroomId} />
                  </div>
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
