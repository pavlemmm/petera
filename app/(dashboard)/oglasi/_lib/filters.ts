import { City, PetType } from "@/db/types";
import type { ListingFilters } from "../_actions/get-listings";

export type SearchParams = {
  [key: string]: string | string[] | undefined;
};

function parseNumber(value?: string | string[]) {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return undefined;
  const parsed = Number(raw);
  if (Number.isNaN(parsed)) return undefined;
  return parsed;
}

export function parseListingFilters(searchParams?: SearchParams): ListingFilters {
  const cityParam = searchParams?.city;
  const minPrice = parseNumber(searchParams?.minPrice);
  const maxPrice = parseNumber(searchParams?.maxPrice);
  const minRating = parseNumber(searchParams?.minRating);
  const petTypeParam = searchParams?.petType;

  const cityValues = new Set(Object.values(City));
  const city =
    typeof cityParam === "string" && cityValues.has(cityParam as City)
      ? (cityParam as City)
      : undefined;

  const petTypesRaw = Array.isArray(petTypeParam)
    ? petTypeParam
    : petTypeParam
      ? [petTypeParam]
      : [];
  const petTypeValues = new Set(Object.values(PetType));
  const petTypes = petTypesRaw.filter((value): value is PetType =>
    petTypeValues.has(value as PetType)
  );

  return {
    city,
    minPrice,
    maxPrice,
    minRating,
    petTypes,
  };
}
