"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { BookRoomSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import CardWrapper from "./CardWrapper";
import { useHookFormMask } from "use-mask-input";
import { sanitizeCpf } from "@/utils/sanitizeData";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { labelsGender } from "@/utils/labelsGender";
import { defaultButton } from "@/utils/constants";

interface FormBookRoomProps {
  onSubmit: (data: Models.Member) => void;
  titleBedroom: string;
  accommodationName: string;
  gender: "M" | "F";
}

const FormBookRoom = ({
  onSubmit,
  titleBedroom,
  accommodationName,
  gender,
}: FormBookRoomProps) => {
  const form = useForm<Models.Member>({
    resolver: zodResolver(BookRoomSchema),
    shouldFocusError: true,
  });

  const registerWithMask = useHookFormMask(form.register);
  const [open, setOpen] = useState(false);

  const onFinish = (data: Models.Member) => {
    onSubmit({ ...data, cpf: sanitizeCpf(data.cpf) } as Models.Member);
    setOpen(false);
  };

  const { pending } = useFormStatus();

  return (
    <>
      <CardWrapper
        title={`🚨 QUARTO ${labelsGender[
          gender || "M"
        ].label.toUpperCase()} 🚨`}
        label={`Você está reservando uma vaga no ${titleBedroom}, ${accommodationName}, esse quarto é só para ${
          gender === "M" ? "MENINOS" : "MENINAS"
        }`}
      >
        <Form {...form}>
          <form className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do acampante</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        disabled={pending}
                        placeholder="Digite o nome do acampante"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Idade</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        disabled={pending}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => field.onChange(+event.target.value)}
                        placeholder="Digite a idade"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        {...registerWithMask("cpf", ["999.999.999-99"], {
                          required: true,
                        })}
                        type="text"
                        disabled={pending}
                        placeholder="Digite o CPF"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
          <Button
            onClick={() => {
              setOpen(true);
            }}
            className={`w-full mt-6 ${defaultButton}`}
            disabled={pending}
          >
            Fazer reserva de vaga
          </Button>
        </Form>
      </CardWrapper>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Atenção</AlertDialogTitle>
            <AlertDialogDescription>
              Você está reservando uma vaga no{" "}
              <b className={`text-${labelsGender[gender].color}`}>
                {titleBedroom}
              </b>
              ,{" "}
              <b className={`text-${labelsGender[gender].color}`}>
                {accommodationName}
              </b>
              , esse quarto é só para{" "}
              <b className={`text-${labelsGender[gender].color}`}>
                {gender === "M" ? "MENINOS" : "MENINAS"}
              </b>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                form.handleSubmit(onFinish)();
              }}
            >
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default FormBookRoom;
