import { listing, sitter, user } from "./schema";

import type { InferSelectModel } from "drizzle-orm";

export type User = InferSelectModel<typeof user>;
export type Sitter = InferSelectModel<typeof sitter>;
export type Listing = InferSelectModel<typeof listing>;

export const CityValues = ["BEOGRAD", "NOVI_SAD", "NIS", "KRAGUJEVAC", "SUBOTICA"] as const;
export type CityType = typeof CityValues[number];
export enum City { BEOGRAD = "BEOGRAD", NOVI_SAD = "NOVI_SAD", NIS = "NIS", KRAGUJEVAC = "KRAGUJEVAC", SUBOTICA = "SUBOTICA" }

export const PetValues = ["DOG", "CAT", "BIRD", "OTHER"] as const;
export type PetType = typeof PetValues[number];
export enum Pet { DOG = "DOG", CAT = "CAT", BIRD = "BIRD", OTHER = "OTHER" }

export const UserRoleValues = ["OWNER", "SITTER"] as const;
export type UserRoleType = typeof UserRoleValues[number];
export enum UserRole { OWNER = "OWNER", SITTER = "SITTER", }

export const BookingStatusValues = ["PENDING", "CONFIRMED", "CANCELLED"] as const;
export type BookingStatusType = typeof BookingStatusValues[number];
export enum BookingStatus { PENDING = "PENDING", CONFIRMED = "CONFIRMED", CANCELLED = "CANCELLED" }
