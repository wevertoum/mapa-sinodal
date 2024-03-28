"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { BedroomSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { z } from "zod";
import { useFormStatus } from "react-dom";
import CardWrapper from "./CardWrapper";
import dayjs from "dayjs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormBedroomProps {
  onSubmit: (data: Models.Bedroom) => void;
  id_accommodation: string;
  id_camp: string;
}

const FormBedroom = ({
  onSubmit,
  id_accommodation,
  id_camp,
}: FormBedroomProps) => {
  const form = useForm({
    resolver: zodResolver(BedroomSchema),
    defaultValues: {
      visibleNumber: "",
      capacity: "",
      gender: "",
    },
    shouldFocusError: true,
  });

  const onFinish = (data: z.infer<typeof BedroomSchema>) => {
    onSubmit({ ...data, id_camp, id_accommodation } as Models.Bedroom);
  };

  const { pending } = useFormStatus();

  return (
    <CardWrapper title="Alojamento" label="Informe os nome do alojamento">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFinish)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacidade do quarto</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Digite a capacidade do quarto"
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
                  <FormLabel>Gênero</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Gênero do quarto (M/F)"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full" disabled={pending}>
            Cadastrar quarto
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default FormBedroom;
