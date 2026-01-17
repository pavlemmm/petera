import { CityValues, PetValues } from "@/db/types";
import { z } from "zod";
import type { ListingFilters, SearchParams } from "../_types";

const citySchema = z.enum(CityValues).optional();

const priceSchema = z.preprocess((value) => {
  if (value === "" || value === undefined || value === null) return undefined;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
}, z.number().min(0).optional());

const petSchema = z.array(z.enum(PetValues)).optional();

const filtersSchema = z.object({
  city: citySchema,
  minPrice: priceSchema,
  maxPrice: priceSchema,
  pets: petSchema,
});

export function parseListingFilters(searchParams?: SearchParams): ListingFilters {
  const parsed = filtersSchema.safeParse(searchParams ?? {});
  console.log(parsed)
  if (!parsed.success) {
    return {};
  }

  return {
    city: parsed.data.city,
    minPrice: parsed.data.minPrice,
    maxPrice: parsed.data.maxPrice,
    pets: parsed.data.pets,
  };
}
