"use server";

import { db } from "@/db/db";
import { listing, listingImage, listingPet } from "@/db/schema";
import { requireAuth } from "@/lib/auth-server-helper";
import { UserRole } from "@/db/types";
import { PostSchema } from "../_validations/listing";

export type CreateListingResult =
  | { success: true }
  | { success: false; error: string };

export async function createListing(
  formData: FormData,
): Promise<CreateListingResult> {
  const {user} = await requireAuth(UserRole.SITTER);

  const parsed = PostSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    city: formData.get("city"),
    price: formData.get("price"),
    petTypes: formData.get("petTypes"),
    images: formData.getAll("images"),
  });

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message;
    return {
      success: false,
      error: firstError ?? "Polja nisu pravilno unesena",
    };
  }

  const { title, description, city, price, petTypes, images } = parsed.data;

  try {
    await db.transaction(async (tx) => {
      const [created] = await tx
        .insert(listing)
        .values({
          sitterId: user.id,
          title,
          description,
          city,
          pricePerDay: price.toFixed(2),
        })
        .returning({ id: listing.id });

      await tx.insert(listingPet).values(
        petTypes.map((petType) => ({
          listingId: created.id,
          petType,
        })),
      );

      const imageRows = await Promise.all(
        images.map(async (file, index) => ({
          listingId: created.id,
          image: Buffer.from(await file.arrayBuffer()),
          mimeType: file.type || "application/octet-stream",
          order: index,
        })),
      );

      await tx.insert(listingImage).values(imageRows);
    });

    return { success: true };
  } catch (e: any) {
    return {
      success: false,
      // error: e?.message ?? "Došlo je do greške",
      error: "Došlo je do greške",
    };
  }
}
