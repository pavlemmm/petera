import { z } from "zod";

export const OwnerRegisterSchema = z.object({
  name: z.string().min(2, "Ime i prezime mora imati bar 2 karaktera."),
  email: z.email("Unesite ispravnu email adresu."),
  phone: z
    .string()
    .min(6, "Broj telefona mora imati bar 6 karaktera.")
    .max(15, "Broj telefona može imati najviše 15 karaktera.")
    .regex(/^(?:\+38)?\d{8,12}$/, "Unesite ispravan broj telefona."),
  password: z.string().min(8, "Lozinka mora imati bar 8 karaktera."),
  confirmPassword: z.string(),
  terms: z.preprocess(
    (v) => v === "on",
    z.literal(true, { message: "Morate prihvatiti uslove." })
  ),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Lozinke se ne poklapaju.",
  path: ["confirmPassword"],
});
