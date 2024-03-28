"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RegisterCampSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { z } from "zod";
import { useFormStatus } from "react-dom";
import CardWrapper from "./CardWrapper";
import dayjs from "dayjs";

interface FormCampProps {
  onSubmit: (data: Models.Camp) => void;
}

const FormCamp = ({ onSubmit }: FormCampProps) => {
  const form = useForm({
    resolver: zodResolver(RegisterCampSchema),
    defaultValues: {
      name: "",
      date: dayjs().format("YYYY-MM-DD"),
    },
    shouldFocusError: true,
  });

  const onFinish = (data: z.infer<typeof RegisterCampSchema>) => {
    onSubmit(data as Models.Camp);
  };

  const { pending } = useFormStatus();
  return (
    <CardWrapper title="Acampamento" label="Cadastrar acampamento">
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
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data do acampamento</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="date"
                      placeholder="Escolha a data"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full" disabled={pending}>
            Cadastrar acampamento
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default FormCamp;
