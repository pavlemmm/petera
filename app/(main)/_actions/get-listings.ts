import { db } from "@/db/db";
import {
  listing,
  listingImage,
  listingPet,
  listingService,
  review,
  user,
} from "@/db/schema";
import { and, desc, eq, gte, inArray, lte, sql, type SQL } from "drizzle-orm";
import type { ListingFilters, Listing } from "../_types";
import type { PetType, ServiceType } from "@/db/types";

export async function getListings(filters?: ListingFilters): Promise<Listing[]> {
  const conditions: SQL[] = [];

  if (filters?.city) {
    conditions.push(eq(listing.city, filters.city));
  }

  if (filters?.minPrice !== undefined) {
    conditions.push(gte(listing.pricePerDay, filters.minPrice.toFixed(2)));
  }

  if (filters?.maxPrice !== undefined) {
    conditions.push(lte(listing.pricePerDay, filters.maxPrice.toFixed(2)));
  }

  if (filters?.pet && filters.pet.length > 0) {
    const petSubquery = db
      .select({ listingId: listingPet.listingId })
      .from(listingPet)
      .where(inArray(listingPet.pet, filters.pet));
    conditions.push(inArray(listing.id, petSubquery));
  }

  if (filters?.service && filters.service.length > 0) {
    const serviceSubquery = db
      .select({ listingId: listingService.listingId })
      .from(listingService)
      .where(inArray(listingService.service, filters.service));
    conditions.push(inArray(listing.id, serviceSubquery));
  }

  const query = db
    .select({
      id: listing.id,
      title: listing.title,
      description: listing.description,
      city: listing.city,
      pricePerDay: listing.pricePerDay,
      sitterName: user.name,
      image: listingImage.image,
      imageMimeType: listingImage.mimeType,
      ratingAverage: sql<number | null>`avg(${review.rating})`,
      reviewCount: sql<number>`count(${review.id})`,
    })
    .from(listing)
    .leftJoin(user, eq(user.id, listing.sitterId))
    .leftJoin(
      listingImage,
      and(eq(listingImage.listingId, listing.id), eq(listingImage.order, 0))
    )
    .leftJoin(review, eq(review.sitterId, listing.sitterId))
    .where(conditions.length ? and(...conditions) : undefined)
    .groupBy(
      listing.id,
      listing.title,
      listing.description,
      listing.city,
      listing.pricePerDay,
      listing.createdAt,
      listingImage.image,
      listingImage.mimeType,
      user.name
    )
    .orderBy(desc(listing.createdAt));

  const baseListings = await query;
  if (baseListings.length === 0) return [];

  const listingIds = baseListings.map((item) => item.id);

  const pets = await db
    .select({
      listingId: listingPet.listingId,
      pet: listingPet.pet,
    })
    .from(listingPet)
    .where(inArray(listingPet.listingId, listingIds));

  const services = await db
    .select({
      listingId: listingService.listingId,
      service: listingService.service,
    })
    .from(listingService)
    .where(inArray(listingService.listingId, listingIds));

  const petsByListing = new Map<string, PetType[]>();
  pets.forEach(({ listingId, pet }) => {
    const existing = petsByListing.get(listingId) ?? [];
    existing.push(pet as PetType);
    petsByListing.set(listingId, existing);
  });

  const servicesByListing = new Map<string, ServiceType[]>();
  services.forEach(({ listingId, service }) => {
    const existing = servicesByListing.get(listingId) ?? [];
    existing.push(service as ServiceType);
    servicesByListing.set(listingId, existing);
  });

  return baseListings.map((listing) => ({
    ...listing,
    pets: petsByListing.get(listing.id) ?? [],
    services: servicesByListing.get(listing.id) ?? [],
  }));
}
