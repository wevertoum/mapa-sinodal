"use client";
import _ from "lodash";
import { BedItemPick } from "./BedItemPick";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCallback, useMemo, useState } from "react";
import FormBookRoom from "./FormBookRoom";
import useCollection from "@/hooks/firebase/useCollection";
import { labelsGender } from "@/utils/labelsGender";
import { UsersIcon } from "@heroicons/react/24/outline";
import useCustomError from "@/hooks/useCustomError";
import ShortListMembers from "./ShortListMembers";

interface BedsListProps {
  id_camp: string;
  accomodation: Models.Accommodation;
  bedroom: Models.Bedroom;
}

const BedsList = ({ id_camp, accomodation, bedroom }: BedsListProps) => {
  const [openReservar, setOpenReservar] = useState(false);
  const [openList, setOpenList] = useState(false);
  const { showError, ErrorComponent } = useCustomError();
  const [members, { add: addMember }] =
    useCollection<Models.Member>("/members");
  const [beds, { add: addBed }] = useCollection<Models.Bed>("/beds", [
    { field: "id_bedroom", value: bedroom.id },
  ]);

  const fullBedroom = useMemo(() => {
    return bedroom.capacity === beds?.length;
  }, [bedroom, beds]);

  const verifyExistence = useCallback(
    (cpf: string) => {
      return members?.find((m) => m.cpf === cpf);
    },
    [members]
  );

  const bedsLength = useMemo(() => (beds && beds.length) || 0, [beds]);

  const postMemberAndUpdateBedroom = useCallback(
    async (member: Models.Member) => {
      const memberExist = verifyExistence(member.cpf);
      if (memberExist) {
        showError(
          `Membro já cadastrado: ${memberExist.name}, em ${memberExist.name_bedroom}, ${memberExist.name_accommodation}`
        );
        return;
      }
      addMember({
        ...member,
        id_camp,
        id_accommodation: accomodation.id,
        name_accommodation: accomodation.name,
        id_bedroom: bedroom.id,
        name_bedroom: bedroom.name,
        gender: bedroom.gender,
      }).then((member) => {
        addBed({
          id_bedroom: bedroom.id,
          id_member: member.id,
          sequence: bedsLength + 1,
        }).then(() => setOpenReservar(false));
      });
    },
    [
      verifyExistence,
      addMember,
      id_camp,
      accomodation,
      bedroom,
      showError,
      addBed,
      bedsLength,
    ]
  );

  const bedsArrayWithAvailability = useMemo(() => {
    return _.range(bedroom.capacity || 0).map((i) => {
      const bed = beds?.find((b) => b.sequence === i + 1);
      return bed || { available: true };
    }) as Models.Bed[];
  }, [bedroom, beds]);

  return (
    <>
      <ErrorComponent />
      <div className="mt-2 grid grid-cols-4 gap-1">
        {bedsArrayWithAvailability.map((bed, i) => (
          <BedItemPick
            key={i}
            available={bed.available || false}
            id_member={bed.id_member || undefined}
          />
        ))}
      </div>

      {fullBedroom ? (
        <div className="mt-2 text-red-500 dark:text-red-400">Quarto cheio</div>
      ) : (
        <Dialog open={openReservar} onOpenChange={setOpenReservar}>
          <div className="flex justify-start">
            <Button className="mt-4 font-bold" size="sm">
              <DialogTrigger onClick={() => setOpenReservar(true)}>
                Reservar
              </DialogTrigger>
            </Button>
          </div>

          <DialogContent
            className={`border-${
              labelsGender[bedroom.gender || "M"].color
            } border-4`}
          >
            <FormBookRoom
              gender={bedroom.gender}
              titleBedroom={bedroom.name || ""}
              accommodationName={accomodation.name || ""}
              onSubmit={(member) => {
                postMemberAndUpdateBedroom(member);
              }}
            />
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={openList} onOpenChange={setOpenList}>
        <div
          onClick={() => setOpenList(true)}
          className="mt-2 cursor-pointer"
          style={{
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
          }}
        >
          <UsersIcon className="h-3 w-3 text-gray-500 dark:text-gray-300 mr-2" />
          <small className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100">
            membros
          </small>
        </div>
        <DialogContent>
          <DialogHeader>
            Membros já presentes em {bedroom.name}, {accomodation.name}
          </DialogHeader>
          <ShortListMembers
            id_camp={id_camp}
            id_accommodation={accomodation.id}
            id_bedroom={bedroom.id}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BedsList;
