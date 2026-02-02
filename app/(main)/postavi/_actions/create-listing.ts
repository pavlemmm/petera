"use server";

import { db } from "@/db/db";
import { listing, listingImage, listingPet, listingService } from "@/db/schema";
import { AuthMode, requireAuth } from "@/lib/auth-server-helper";
import { UserRole } from "@/db/types";
import { PostSchema } from "../_validations/listing";

export type CreateListingResult =
  | { success: true }
  | { success: false; error: string };

export async function createListing(
  formData: FormData,
): Promise<CreateListingResult> {
  const { user } = await requireAuth(AuthMode.REQUIRED, UserRole.SITTER);

  const parsed = PostSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    city: formData.get("city"),
    price: formData.get("price"),
    pets: formData.getAll("pet"),
    services: formData.getAll("service"),
    images: formData.getAll("image"),
  });

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message;
    return {
      success: false,
      error: firstError ?? "Polja nisu ispravno popunjena.",
    };
  }

  const { title, description, city, price, pets, services, images } =
    parsed.data;

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
        pets.map((pet) => ({
          listingId: created.id,
          pet,
        })),
      );

      await tx.insert(listingService).values(
        services.map((service) => ({
          listingId: created.id,
          service,
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
