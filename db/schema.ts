import {
  pgTable,
  uuid,
  text,
  integer,
  boolean,
  numeric,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

// ENUMS ==============================

export const userRole = pgEnum("user_role", ["OWNER", "SITTER"]);
export const petType = pgEnum("pet_type", ["DOG", "CAT", "BIRD", "OTHER"]);
export const bookingStatus = pgEnum("booking_status", [
  "PENDING",
  "CONFIRMED",
  "CANCELLED",
]);

// USERS ==============================

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  salt: text("salt").notNull(),
  name: text("name").notNull(),
  lastName: text("last_name").notNull(),
  role: userRole("role").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// SITTERS ============================

export const sitters = pgTable("sitters", {
  id: uuid("id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  bio: text("bio"),
  ratingAvg: numeric("rating_avg", { precision: 3, scale: 2 }).default("0"),
  ratingCount: integer("rating_count").default(0),
});

// LISTINGS ===========================

export const listings = pgTable("listings", {
  id: uuid("id").defaultRandom().primaryKey(),
  sitterId: uuid("sitter_id")
    .notNull()
    .references(() => sitters.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  city: text("city").notNull(),
  pricePerDay: numeric("price_per_day", { precision: 10, scale: 2 }).notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// LISTING PET TYPES ==================

export const listingPetTypes = pgTable("listing_pet_types", {
  id: uuid("id").defaultRandom().primaryKey(),
  listingId: uuid("listing_id")
    .notNull()
    .references(() => listings.id, { onDelete: "cascade" }),
  petType: petType("pet_type").notNull(),
});

// REVIEWS ============================

export const reviews = pgTable("reviews", {
  id: uuid("id").defaultRandom().primaryKey(),
  sitterId: uuid("sitter_id")
    .notNull()
    .references(() => sitters.id, { onDelete: "cascade" }),
  ownerId: uuid("owner_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// BOOKINGS ===========================

export const bookings = pgTable("bookings", {
  id: uuid("id").defaultRandom().primaryKey(),
  listingId: uuid("listing_id")
    .notNull()
    .references(() => listings.id, { onDelete: "cascade" }),
  ownerId: uuid("owner_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  startDate: text("start_date").notNull(),
  endDate: text("end_date").notNull(),
  status: bookingStatus("status").default("PENDING"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
