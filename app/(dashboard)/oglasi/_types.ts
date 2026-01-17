import type { CityType, PetType } from "@/db/types";

export type SearchParams = Record<string, string | string[] | undefined>;
export type SearchParamsPromise = Promise<SearchParams>;

export type ListingFilters = {
  city?: CityType;
  minPrice?: number;
  maxPrice?: number;
  pet?: PetType[];
};

export type Listing = {
  id: string;
  title: string;
  description: string;
  city: CityType;
  pricePerDay: string | number;
  image: Buffer | null;
  imageMimeType: string | null;
  ratingAverage: number | null;
  reviewCount: number;
};
