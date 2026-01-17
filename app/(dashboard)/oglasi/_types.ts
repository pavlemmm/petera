import { City, PetType } from "@/db/types";

export type SearchParams = Record<string, string | string[] | undefined>;
export type SearchParamsPromise = Promise<SearchParams>;

export type ListingFilters = {
  city?: City;
  minPrice?: number;
  maxPrice?: number;
  petTypes?: PetType[];
};

export type Listing = {
  id: string;
  sitterId: string;
  title: string;
  description: string;
  city: City;
  pricePerDay: string | number;
  image: Buffer | null;
  imageMimeType: string | null;
  ratingAverage: number | null;
  reviewCount: number;
};
