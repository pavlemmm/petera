import { z } from "zod";

export const OwnerRegisterSchema = z.object({
  name: z.string().min(2, "Ime i Prezime mora imati bar 2 karaktera."),
  email: z.email("Unesite validan email."),
  password: z.string().min(8, "Šifra mora imati bar 8 karaktera."),
  confirmPassword: z.string(),
  terms: z.preprocess(
    (v) => v === "on",
    z.literal(true, { message: "Morate prihvatiti uslove." })
  ),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Šifre se ne poklapaju.",
  path: ["confirmPassword"],
});

