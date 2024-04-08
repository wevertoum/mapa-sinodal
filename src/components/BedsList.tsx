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

interface BedsListProps {
  id_camp: string;
  accomodation: Models.Accommodation;
  bedroom: Models.Bedroom;
}

const BedsList = ({ id_camp, accomodation, bedroom }: BedsListProps) => {
  const [open, setOpen] = useState(false);
  const [members, { add: addMember }] =
    useCollection<Models.Member>("/members");
  const [beds, { add: addBed }] = useCollection<Models.Bed>(
    "/beds",
    "id_bedroom",
    bedroom.id
  );

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
      if (verifyExistence(member.cpf)) {
        alert("CPF já cadastrado");
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
        }).then(() => setOpen(false));
      });
    },
    [addMember, addBed, bedroom]
  );

  const bedsArrayWithAvailability = useMemo(() => {
    return _.range(bedroom.capacity || 0).map((i) => {
      const bed = beds?.find((b) => b.sequence === i + 1);
      return bed || { available: true };
    }) as Models.Bed[];
  }, [bedroom, beds]);

  return (
    <>
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
        <Dialog open={open} onOpenChange={setOpen}>
          <div className="flex justify-start">
            <Button className={`mt-4 font-bold`}>
              <DialogTrigger onClick={() => setOpen(true)}>
                Reservar
              </DialogTrigger>
            </Button>
          </div>

          <DialogContent
            className={`border-${
              labelsGender[bedroom.gender || "M"].color
            } border-4`}
          >
            <DialogHeader>
              <FormBookRoom
                gender={bedroom.gender}
                titleBedroom={bedroom.name || ""}
                accommodationName={accomodation.name || ""}
                onSubmit={(member) => {
                  postMemberAndUpdateBedroom(member);
                }}
              />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default BedsList;
