"use server";

import { db } from "@/db/db";
import { listing } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { CityType } from "@/db/types";

export type ListingSummary = {
  id: string;
  title: string;
  city: CityType;
  pricePerDay: string | number;
};

export async function getListingSummary(
  id: string,
): Promise<ListingSummary | null> {
  try {
    const [row] = await db
      .select({
        id: listing.id,
        title: listing.title,
        city: listing.city,
        pricePerDay: listing.pricePerDay,
      })
      .from(listing)
      .where(eq(listing.id, id));

    if (!row) return null;
    return row;
  } catch {
    return null;
  }
}
