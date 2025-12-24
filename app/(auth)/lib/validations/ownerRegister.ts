import { z } from "zod";

export const OwnerRegisterSchema = z.object({
  name: z.string().min(2, "Ime mora imati bar 2 karaktera."),
  lastName: z.string().min(2, "Prezime mora imati bar 2 karaktera."),
  email: z.email("Unesite validan email."),
  password: z.string().min(8, "Šifra mora imati bar 8 karaktera."),
  confirmPassword: z.string(),
  terms: z.boolean().refine(v => v === true, "Morate prihvatiti uslove."),
  // document: z.any().refine(
  //     (val) => Array.isArray(val) && val.length > 0,
  //     "Morate uploadovati bar jednu sliku"
  //   )
  //   .refine(
  //     (val) => Array.isArray(val) && val.every((f) => f instanceof File),
  //     "Svi poslati fajlovi moraju biti tipa File"
  //   ),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Šifre se ne poklapaju.",
  path: ["confirmPassword"],
});

