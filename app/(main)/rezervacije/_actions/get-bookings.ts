"use server";

import { db } from "@/db/db";
import { booking, listing } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { requireAuth } from "@/lib/auth-server-helper";
import { UserRole } from "@/db/types";

export type BookingListItem = {
  id: string;
  listingId: string;
  listingTitle: string;
  startDate: string;
  endDate: string;
  status: string | null;
  totalAmount: string | number;
  currency: string;
};

export async function getBookings(): Promise<BookingListItem[]> {
  const { user, role } = await requireAuth();

  const baseQuery = db
    .select({
      id: booking.id,
      listingId: booking.listingId,
      listingTitle: listing.title,
      startDate: booking.startDate,
      endDate: booking.endDate,
      status: booking.status,
      totalAmount: booking.totalAmount,
      currency: booking.currency,
    })
    .from(booking)
    .innerJoin(listing, eq(booking.listingId, listing.id));

  const rows =
    role === UserRole.SITTER
      ? await baseQuery
          .where(eq(listing.sitterId, user.id))
          .orderBy(desc(booking.createdAt))
      : await baseQuery
          .where(eq(booking.ownerId, user.id))
          .orderBy(desc(booking.createdAt));

  return rows;
}
