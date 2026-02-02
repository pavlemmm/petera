"use server";

import { db } from "@/db/db";
import { booking, listing } from "@/db/schema";
import { eq } from "drizzle-orm";
import { AuthMode, requireAuth } from "@/lib/auth-server-helper";
import { UserRole } from "@/db/types";

export type CreateBookingResult =
  | { success: true; bookingId: string }
  | { success: false; error: string };

const PLATFORM_FEE_PERCENT = 0.15;

type CreateBookingInput = {
  listingId: string;
  startDate: string;
  endDate: string;
};

function isValidDate(value: string) {
  const date = new Date(value);
  return !Number.isNaN(date.getTime());
}

function calculateDays(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 0;
  const days = Math.ceil((end.getTime() - start.getTime()) / 86400000) + 1;
  return days < 1 ? 0 : days;
}

export async function createBooking(
  input: CreateBookingInput,
): Promise<CreateBookingResult> {
  const { user } = await requireAuth(AuthMode.REQUIRED, UserRole.OWNER);

  if (!isValidDate(input.startDate) || !isValidDate(input.endDate)) {
    return { success: false, error: "Datumi nisu validni." };
  }

  const start = new Date(input.startDate);
  const end = new Date(input.endDate);
  if (end < start) {
    return { success: false, error: "Krajnji datum je pre početnog." };
  }

  const [found] = await db
    .select({ id: listing.id, pricePerDay: listing.pricePerDay })
    .from(listing)
    .where(eq(listing.id, input.listingId));

  if (!found) {
    return { success: false, error: "Oglas nije pronađen." };
  }

  const priceValue =
    typeof found.pricePerDay === "number"
      ? found.pricePerDay
      : Number(found.pricePerDay);
  if (Number.isNaN(priceValue)) {
    return { success: false, error: "Cena oglasa nije validna." };
  }

  const days = calculateDays(input.startDate, input.endDate);
  if (!days) {
    return { success: false, error: "Odaberite ispravan opseg datuma." };
  }

  const base = priceValue * days;
  const fee = base * PLATFORM_FEE_PERCENT;
  const total = base + fee;

  const [created] = await db
    .insert(booking)
    .values({
      listingId: input.listingId,
      ownerId: user.id,
      startDate: input.startDate,
      endDate: input.endDate,
      pricePerDay: priceValue.toFixed(2),
      feeAmount: fee.toFixed(2),
      totalAmount: total.toFixed(2),
      currency: "RSD",
      status: "PENDING",
    })
    .returning({ id: booking.id });

  return { success: true, bookingId: created.id };
}
