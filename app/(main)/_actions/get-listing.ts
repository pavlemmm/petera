import { db } from "@/db/db";
import {
  listing,
  listingImage,
  listingPet,
  listingService,
  review,
  sitter,
  user,
} from "@/db/schema";
import { asc, eq, sql } from "drizzle-orm";
import type { ListingDetail } from "../_types";

export async function getListing(id: string): Promise<ListingDetail | null> {
  try {
    const [row] = await db
      .select({
        id: listing.id,
        sitterId: listing.sitterId,
        title: listing.title,
        description: listing.description,
        city: listing.city,
        pricePerDay: listing.pricePerDay,
        createdAt: listing.createdAt,
        sitterName: user.name,
        sitterBio: sitter.bio,
      })
      .from(listing)
      .leftJoin(sitter, eq(sitter.id, listing.sitterId))
      .leftJoin(user, eq(user.id, listing.sitterId))
      .where(eq(listing.id, id));

    if (!row) return null;

    const images = await db
      .select({
        image: listingImage.image,
        mimeType: listingImage.mimeType,
        order: listingImage.order,
      })
      .from(listingImage)
      .where(eq(listingImage.listingId, row.id))
      .orderBy(asc(listingImage.order));

    const pets = await db
      .select({ pet: listingPet.pet })
      .from(listingPet)
      .where(eq(listingPet.listingId, row.id));

    const services = await db
      .select({ service: listingService.service })
      .from(listingService)
      .where(eq(listingService.listingId, row.id));

    const [ratingRow] = await db
      .select({
        ratingAverage: sql<number | null>`avg(${review.rating})`,
        reviewCount: sql<number>`count(${review.id})`,
      })
      .from(review)
      .where(eq(review.sitterId, row.sitterId));

    return {
      id: row.id,
      title: row.title,
      description: row.description,
      city: row.city,
      pricePerDay: row.pricePerDay,
      createdAt: row.createdAt,
      images,
      pets: pets.map((item) => item.pet),
      services: services.map((item) => item.service),
      ratingAverage: ratingRow?.ratingAverage ?? null,
      reviewCount: ratingRow?.reviewCount ?? 0,
      sitterName: row.sitterName ?? "Nepoznato",
      sitterBio: row.sitterBio ?? null,
    };
  } catch {
    return null;
  }

}
