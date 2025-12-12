import { z } from "zod";

export const CuvarSchema = z.object({
  ime: z.string().min(2, "Ime mora imati bar 2 karaktera."),
  prezime: z.string().min(2, "Prezime mora imati bar 2 karaktera."),
  email: z.email("Unesite validan email."),
  password: z.string().min(8, "Šifra mora imati bar 8 karaktera."),
  confirmPassword: z.string(),
  terms: z.boolean().refine(v => v === true, "Morate prihvatiti uslove."),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Šifre se ne poklapaju.",
  path: ["confirmPassword"],
});
