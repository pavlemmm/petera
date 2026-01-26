import { z } from "zod";
import { CityValues, PetValues, ServiceValues } from "@/db/types";

const MAX_IMAGES = 3;
const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB

const PriceSchema = z.preprocess(
  (v) => {
    if (typeof v === "number") return v;
    if (typeof v === "string" && v.trim() !== "") return Number(v);
    return NaN;
  },
  z.number().positive("Cena mora biti veća od 0.")
);

const PetSchema = z.array(z.enum(PetValues)).min(1, "Odaberite bar jedan tip.");
const ServiceSchema = z
  .array(z.enum(ServiceValues))
  .min(1, "Odaberite bar jednu uslugu.");

const ImagesSchema = z.preprocess(
  (v) => {
    if (v instanceof File) return [v];
    if (Array.isArray(v)) return v;
    return [];
  },
  z.array(z.instanceof(File))
    .min(1, "Dodajte bar jednu fotografiju.")
    .max(MAX_IMAGES, `Maksimalno ${MAX_IMAGES} fotografije.`)
    .refine(
      (files) => files.every((file) => file.size <= MAX_IMAGE_SIZE),
      "Fotografije moraju biti manje od 2MB."
    )
);

export const PostSchema = z.object({
  title: z.string().min(2, "Naslov mora imati bar 2 karaktera."),
  description: z.string().min(8, "Opis mora imati bar 8 karaktera."),
  city: z.enum(CityValues, { message: "Odaberite grad." }),
  price: PriceSchema,
  pets: PetSchema,
  services: ServiceSchema,
  images: ImagesSchema,
});
