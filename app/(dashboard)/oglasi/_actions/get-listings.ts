import { db } from "@/db/db";
import { listing, listingImage, listingPetType, review } from "@/db/schema";
import { City, PetType } from "@/db/types";
import { and, desc, eq, gte, inArray, lte, sql } from "drizzle-orm";

export type ListingFilters = {
  city?: City;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  petTypes?: PetType[];
};

export async function getListings(filters?: ListingFilters) {
  const conditions = [];

  if (filters?.city) {
    conditions.push(eq(listing.city, filters.city));
  }

  if (filters?.minPrice !== undefined) {
    conditions.push(gte(listing.pricePerDay, filters.minPrice.toString()));
  }

  if (filters?.maxPrice !== undefined) {
    conditions.push(lte(listing.pricePerDay, filters.maxPrice.toString()));
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

  if (filters?.minRating !== undefined) {
    return query.having(sql`avg(${review.rating}) >= ${filters.minRating}`);
  }

  return query;
}
