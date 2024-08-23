"use client";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCollection from "@/hooks/firebase/useCollection";

interface SelectBedroomProps {
  selectedAccommodation: string;
  onValueChange: (value: Models.Bedroom) => void;
  disabled: boolean;
}

const SelectBedroom = ({
  selectedAccommodation,
  onValueChange,
  disabled,
}: SelectBedroomProps) => {
  const [bedrooms, setBedrooms] = useState<Models.Bedroom[] | null>(null);

  const [fetchedBedrooms] = useCollection<Models.Bedroom>("/bedrooms", [
    { field: "id_accommodation", value: selectedAccommodation },
  ]);

  useEffect(() => {
    setBedrooms(fetchedBedrooms);
  }, [fetchedBedrooms]);

  const handleValueChange = (value: string) => {
    const bedroom = bedrooms?.find((bed) => bed.id === value);
    if (bedroom) {
      onValueChange(bedroom);
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor="bedroom">Selecionar quarto</label>
      <Select disabled={disabled} onValueChange={handleValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione o quarto" />
        </SelectTrigger>
        <SelectContent>
          {bedrooms?.map((bed) => (
            <SelectItem key={bed.id} value={bed.id}>
              {bed.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectBedroom;
