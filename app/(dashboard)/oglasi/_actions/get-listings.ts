import { db } from "@/db/db";
import { listing, listingImage, listingPetType, review } from "@/db/schema";
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

  if (filters?.petTypes && filters.petTypes.length > 0) {
    const petTypeSubquery = db
      .select({ listingId: listingPetType.listingId })
      .from(listingPetType)
      .where(inArray(listingPetType.petType, filters.petTypes));
    conditions.push(inArray(listing.id, petTypeSubquery));
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
