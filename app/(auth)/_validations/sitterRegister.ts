import { z } from "zod";

const MAX_IMAGES = 3;
const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB

export const SitterRegisterSchema = z.object({
  name: z.string().min(2, "Ime i prezime mora imati bar 2 karaktera."),
  email: z.email("Unesite ispravnu email adresu."),
  phone: z
    .string()
    .min(6, "Broj telefona mora imati bar 6 karaktera.")
    .max(15, "Broj telefona može imati najviše 15 karaktera.")
    .regex(/^(?:\+38)?\d{6,12}$/, "Unesite ispravan broj telefona."),
  password: z.string().min(8, "Lozinka mora imati bar 8 karaktera."),
  confirmPassword: z.string(),
  terms: z.preprocess(
    (v) => v === "on",
    z.literal(true, { message: "Morate prihvatiti uslove." })
  ),
  document: z.preprocess(
    (v) => {
      if (v instanceof File) return [v];
      if (Array.isArray(v)) return v;
      return [];
    },
    z.array(z.instanceof(File))
      .min(1, "Dodajte bar jednu sliku.")
      .max(MAX_IMAGES, `Maksimalno ${MAX_IMAGES} slike.`)
      .refine(
        (files) => files.every((file) => file.size <= MAX_IMAGE_SIZE),
        "Slike moraju biti manje od 2MB."
      )
  ),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Lozinke se ne poklapaju.",
  path: ["confirmPassword"],
});
