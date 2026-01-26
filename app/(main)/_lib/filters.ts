import { CityValues, PetValues, ServiceValues } from "@/db/types";
import { z } from "zod";
import type { ListingFilters, SearchParams } from "../_types";

const citySchema = z.enum(CityValues).optional();

const priceSchema = z.preprocess((value) => {
  if (value === "" || value === undefined || value === null) return undefined;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
}, z.number().min(0).optional());

const petSchema = z.preprocess(
  (v) => {
    if (v == null) return undefined;
    return Array.isArray(v) ? v : [v];
  },
  z.array(z.enum(PetValues)).optional()
);

const serviceSchema = z.preprocess(
  (v) => {
    if (v == null) return undefined;
    return Array.isArray(v) ? v : [v];
  },
  z.array(z.enum(ServiceValues)).optional()
);

const filtersSchema = z.object({
  city: citySchema,
  minPrice: priceSchema,
  maxPrice: priceSchema,
  pet: petSchema,
  service: serviceSchema,
});

export function parseListingFilters(searchParams?: SearchParams): ListingFilters {
  const parsed = filtersSchema.safeParse(searchParams ?? {});
  if (!parsed.success) {
    return {};
  }

  return {
    city: parsed.data.city,
    minPrice: parsed.data.minPrice,
    maxPrice: parsed.data.maxPrice,
    pet: parsed.data.pet,
    service: parsed.data.service,
  };
}
