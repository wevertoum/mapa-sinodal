"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AccommodationSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { z } from "zod";
import { useFormStatus } from "react-dom";
import CardWrapper from "./CardWrapper";
import dayjs from "dayjs";

interface FormAccommodationProps {
  onSubmit: (data: Models.Accommodation) => void;
}

const FormAccommodation = ({ onSubmit }: FormAccommodationProps) => {
  const form = useForm({
    resolver: zodResolver(AccommodationSchema),
    defaultValues: {
      name: "",
    },
    shouldFocusError: true,
  });

  const onFinish = (data: z.infer<typeof AccommodationSchema>) => {
    onSubmit(data as Models.Accommodation);
  };

  const { pending } = useFormStatus();

  return (
    <CardWrapper title="Alojamento" label="Informe os nome do alojamento">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFinish)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do alojamento</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Digite o nome do alojamento"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full" disabled={pending}>
            Cadastrar alojamento
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default FormAccommodation;
