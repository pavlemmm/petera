import { City, PetType } from "@/db/types";
import { z } from "zod";
import type { ListingFilters, SearchParams } from "../_types";

const citySchema = z.enum(City).optional()

const priceSchema = z.preprocess((value) => {
  if (value === "" || value === undefined || value === null) return undefined;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
}, z.number().min(0).optional());

const petTypesSchema = z.array(z.enum(PetType)).optional();

const filtersSchema = z.object({
  city: citySchema,
  minPrice: priceSchema,
  maxPrice: priceSchema,
  petType: petTypesSchema,
});

export function parseListingFilters(searchParams: SearchParams): ListingFilters {
  console.log(searchParams)
  const parsed = filtersSchema.safeParse(searchParams);
  if (!parsed.success) {
    return {};
  }

  return {
    city: parsed.data.city,
    minPrice: parsed.data.minPrice,
    maxPrice: parsed.data.maxPrice,
    petTypes: parsed.data.petType,
  };
}
