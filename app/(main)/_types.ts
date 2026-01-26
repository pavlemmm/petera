import type { CityType, PetType, ServiceType } from "@/db/types";

export type SearchParams = Record<string, string | string[] | undefined>;
export type SearchParamsPromise = Promise<SearchParams>;

export type ListingFilters = {
  city?: CityType;
  minPrice?: number;
  maxPrice?: number;
  pet?: PetType[];
  service?: ServiceType[];
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
  pets: PetType[];
  services: ServiceType[];
  sitterName: string | null;
};

export type ListingImage = {
  image: Buffer;
  mimeType: string;
  order: number;
};

export type ListingDetail = {
  id: string;
  title: string;
  description: string;
  city: CityType;
  pricePerDay: string | number;
  createdAt: Date;
  images: ListingImage[];
  pets: PetType[];
  services: ServiceType[];
  ratingAverage: number | null;
  reviewCount: number;
  sitterName: string;
  sitterBio: string | null;
};
