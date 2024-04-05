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
import { z } from "zod";
import { useFormStatus } from "react-dom";
import CardWrapper from "./CardWrapper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface FormBookRoomProps {
  onSubmit: (data: Models.Member) => void;
}

const FormBookRoom = ({ onSubmit }: FormBookRoomProps) => {
  const form = useForm({
    resolver: zodResolver(BookRoomSchema),
    defaultValues: {
      name: "",
      age: 0,
      cpf: "",
      gender: "",
    },
    shouldFocusError: true,
  });

  const onFinish = (data: z.infer<typeof BookRoomSchema>) => {
    onSubmit(data as Models.Member);
  };

  const { pending } = useFormStatus();

  return (
    <CardWrapper title="Acampamento" label="Informe os dados do acampamento">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFinish)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do acampamento</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Digite o nome do acampamento"
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
                      onChange={(event) => field.onChange(+event.target.value)}
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
                      type="text"
                      placeholder="Digite o CPF (formato: 000.000.000-00)"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sexo</FormLabel>
                  <FormControl>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Selecione o sexo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          value="M"
                          onClick={() => field.onChange("M")}
                        >
                          Masculino
                        </SelectItem>
                        <SelectItem
                          value="F"
                          onClick={() => field.onChange("F")}
                        >
                          Feminino
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full" disabled={pending}>
            Fazer reserva de quarto
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default FormBookRoom;
