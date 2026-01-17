import { db } from "@/db/db";
import { listing, listingImage, listingPet, review } from "@/db/schema";
import { and, desc, eq, gte, inArray, lte, sql, type SQL } from "drizzle-orm";
import type { ListingFilters, Listing } from "../_types";

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

  const query = db
    .select({
      id: listing.id,
      title: listing.title,
      description: listing.description,
      city: listing.city,
      pricePerDay: listing.pricePerDay,
      image: listingImage.image,
      imageMimeType: listingImage.mimeType,
      ratingAverage: sql<number | null>`avg(${review.rating})`,
      reviewCount: sql<number>`count(${review.id})`,
    })
    .from(listing)
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
      listingImage.mimeType
    )
    .orderBy(desc(listing.createdAt));

  return query;
}
