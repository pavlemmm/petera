import { relations } from "drizzle-orm";
import {
  pgTable,
  uuid,
  text,
  integer,
  boolean,
  numeric,
  timestamp,
  pgEnum,
  index,
  customType,
} from "drizzle-orm/pg-core";
import { BookingStatusValues, CityValues, PetValues, ServiceValues, UserRoleValues } from "./types";


// WHILE THEY FIX BYTEA IMPORT
export const bytea = customType<{ data: Buffer }>({
  dataType() {
    return "bytea";
  },
  toDriver(value) {
    return value;
  },
  fromDriver(value) {
    // najčešće node-postgres vraća Buffer
    if (Buffer.isBuffer(value)) return value;

    // neki drajveri mogu vratiti hex string tipa "\\xDEADBEEF"
    if (typeof value === "string" && value.startsWith("\\x")) {
      return Buffer.from(value.slice(2), "hex");
    }

    // fallback
    return value as Buffer;
  },
});


// ENUMS ==============================

export const userRole = pgEnum("user_role", UserRoleValues);
export const city = pgEnum("city", CityValues);
export const pet = pgEnum("pet", PetValues);
export const service = pgEnum("service", ServiceValues);
export const bookingStatus = pgEnum("booking_status", BookingStatusValues);

// USERS ==============================

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  emailVerified: boolean("email_verified").default(false).notNull(),
  // image: text("image"),
  role: userRole("role").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

// SITTERS ============================

export const sitter = pgTable("sitter", {
  id: text("id")
    .primaryKey()
    .references(() => user.id, { onDelete: "cascade" }),
  bio: text("bio"),
});

// LISTINGS ===========================

export const listing = pgTable("listing", {
  id: uuid("id").defaultRandom().primaryKey(),
  sitterId: text("sitter_id")
    .notNull()
    .references(() => sitter.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  city: city("city").notNull(),
  pricePerDay: numeric("price_per_day", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// LISTINGS IMAGE ====================

export const listingImage = pgTable("listing_image", {
  id: uuid("id").defaultRandom().primaryKey(),
  listingId: uuid("listing_id")
    .notNull()
    .references(() => listing.id, { onDelete: "cascade" }),
  image: bytea("image").notNull(),
  mimeType: text("mime_type").notNull(),
  order: integer("order").notNull(), // 0,1,2
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// LISTING PET ==================

export const listingPet = pgTable("listing_pet", {
  id: uuid("id").defaultRandom().primaryKey(),
  listingId: uuid("listing_id")
    .notNull()
    .references(() => listing.id, { onDelete: "cascade" }),
  pet: pet("pet").notNull(),
});

// LISTING SERVICE ==================

export const listingService = pgTable("listing_service", {
  id: uuid("id").defaultRandom().primaryKey(),
  listingId: uuid("listing_id")
    .notNull()
    .references(() => listing.id, { onDelete: "cascade" }),
  service: service("service").notNull(),
});

// REVIEWS ============================

export const review = pgTable("review", {
  id: uuid("id").defaultRandom().primaryKey(),
  sitterId: text("sitter_id")
    .notNull()
    .references(() => sitter.id, { onDelete: "cascade" }),
  ownerId: text("owner_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// BOOKING ===========================

export const booking = pgTable("booking", {
  id: uuid("id").defaultRandom().primaryKey(),
  listingId: uuid("listing_id")
    .notNull()
    .references(() => listing.id, { onDelete: "cascade" }),
  ownerId: text("owner_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  startDate: text("start_date").notNull(),
  endDate: text("end_date").notNull(),
  pricePerDay: numeric("price_per_day", { precision: 10, scale: 2 }).notNull(),
  feeAmount: numeric("fee_amount", { precision: 10, scale: 2 }).notNull(),
  totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").default("RSD").notNull(),
  status: bookingStatus("status").default("PENDING"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// BETTER-AUTH ========================

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));
