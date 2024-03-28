import * as z from "zod";

export const RegisterCampSchema = z.object({
  name: z.string().min(1, {
    message: "Por favor, insira um nome válido",
  }),
  date: z.string().min(1, {
    message: "Por favor, insira uma data válida",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Por favor, insira um e-mail válido",
  }),
  password: z.string().min(6, {
    message: "A senha deve conter no mínimo 6 caracteres",
  }),
});

export const AccommodationSchema = z.object({
  name: z.string().min(1, {
    message: "Por favor, insira um nome válido",
  }),
});

export const BedroomSchema = z.object({
  capacity: z.string().min(1, {
    message: "Por favor, insira um número válido",
  }),
  gender: z.string().refine((value) => value === "M" || value === "F", {
    message: "Por favor, insira um gênero válido (M/F)",
  }),
});
