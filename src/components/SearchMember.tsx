import React, { useEffect } from "react";
import { debounce } from "lodash";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import useCollection from "@/hooks/firebase/useCollection";

interface SearchMemberProps {
  members?: Models.Member[];
  onFindMember?: (member: Models.Member) => void;
}

const SearchMember = ({
  members,
  onFindMember = () => {},
}: SearchMemberProps) => {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    console.log("teste");
  }, []);

  return (
    <>
      <>
        <Button
          onClick={() => setOpen(true)}
          className="w-full md:w-1/2 lg:w-1/3"
        >
          <Search className="mr-2 h-4 w-4" />
          Buscar membro
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Buscar acampante..." />
          <CommandList>
            <CommandEmpty>
              <span>Nenhum acampante encontrado</span>
            </CommandEmpty>
            <CommandGroup heading="Acampantes">
              {members &&
                members.map((member) => (
                  <CommandItem
                    key={member.name}
                    className="cursor-pointer"
                    onSelect={() => {
                      onFindMember(member);
                      setOpen(false);
                    }}
                  >
                    <span>
                      {member.name} | {member.name_accommodation} |{" "}
                      {member.name_bedroom}
                    </span>
                  </CommandItem>
                ))}
            </CommandGroup>
            <CommandSeparator />
          </CommandList>
        </CommandDialog>
      </>
    </>
  );
};

export default SearchMember;
