"use client";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import useCollection from "@/hooks/firebase/useCollection";
import { useDocument } from "@/hooks/firebase/useDocument";
import PopConfirm from "./PopConfirm";
import SelectBedroom from "./SelectBedroom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getBedsFromBedroom } from "@/utils/getBedsFromBedroom";
import useCustomError from "@/hooks/useCustomError";

interface MoveMemberContentProps {
  member: Models.Member;
  onTransferSuccess: () => void;
  id_camp: string;
}

const MoveMemberContent = ({
  member,
  onTransferSuccess,
  id_camp,
}: MoveMemberContentProps) => {
  const [selectedAccommodation, setSelectedAccommodation] = useState<string>();
  const [selectedBedroom, setSelectedBedroom] = useState<Models.Bedroom>();
  const { showError, ErrorComponent } = useCustomError();

  const [accommodations] = useCollection<Models.Accommodation>(
    "/accommodations",
    [{ field: "id_camp", value: id_camp }]
  );

  const [beds, { add: addBed, remove: removeBed }] = useCollection<Models.Bed>(
    "/beds",
    [{ field: "id_member", value: member.id }]
  );

  const [, { update: updateMember }] = useDocument<Models.Member>(
    `members/${member.id}`
  );

  const handleTransfer = useCallback(async () => {
    if (!selectedAccommodation || !selectedBedroom || !beds) return;

    const existingBeds = await getBedsFromBedroom(selectedBedroom.id);

    const fullBedroom = selectedBedroom.capacity === existingBeds.length;

    if (fullBedroom) {
      showError("Quarto cheio, selecione outro quarto.");
      return;
    }

    const updatedMember = {
      ...member,
      id_accommodation: selectedAccommodation,
      name_accommodation:
        accommodations?.find((acc) => acc.id === selectedAccommodation)?.name ||
        "",
      id_bedroom: selectedBedroom.id,
      name_bedroom: selectedBedroom.name,
    };

    await updateMember(updatedMember);
    if (beds[0]?.id) {
      await removeBed(beds[0].id);
    }
    await addBed({
      id_bedroom: selectedBedroom.id,
      id_member: member.id,
    });

    onTransferSuccess();
  }, [
    selectedAccommodation,
    selectedBedroom,
    beds,
    member,
    accommodations,
    updateMember,
    addBed,
    onTransferSuccess,
    showError,
    removeBed,
  ]);

  const handleChangeAccommodation = (value: string) => {
    setSelectedAccommodation(undefined);
    setTimeout(() => {
      setSelectedAccommodation(value);
      setSelectedBedroom(undefined);
    }, 200);
  };

  return (
    <div>
      <ErrorComponent />
      <div className="mb-4">
        <label htmlFor="accommodation">Selecionar alojamento</label>
        <Select onValueChange={handleChangeAccommodation}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o alojamento" />
          </SelectTrigger>
          <SelectContent>
            {accommodations?.map((acc) => (
              <SelectItem key={acc.id} value={acc.id}>
                {acc.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedAccommodation && (
        <SelectBedroom
          selectedAccommodation={selectedAccommodation}
          onValueChange={setSelectedBedroom}
          disabled={!selectedAccommodation}
        />
      )}

      <PopConfirm
        disabled={!selectedBedroom}
        onConfirm={handleTransfer}
        title="Tem certeza que deseja transferir o membro?"
        description="Esta ação não pode ser desfeita."
      >
        <Button disabled={!selectedBedroom}>Transferir Membro</Button>
      </PopConfirm>
    </div>
  );
};

export default MoveMemberContent;
