CREATE TYPE "public"."booking_status" AS ENUM('PENDING', 'CONFIRMED', 'CANCELLED');--> statement-breakpoint
CREATE TYPE "public"."pet_type" AS ENUM('DOG', 'CAT', 'BIRD', 'OTHER');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('OWNER', 'SITTER');--> statement-breakpoint
CREATE TABLE "bookings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"listing_id" uuid NOT NULL,
	"owner_id" uuid NOT NULL,
	"start_date" text NOT NULL,
	"end_date" text NOT NULL,
	"status" "booking_status" DEFAULT 'PENDING',
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "listing_pet_types" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"listing_id" uuid NOT NULL,
	"pet_type" "pet_type" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "listings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sitter_id" uuid NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"city" text NOT NULL,
	"price_per_day" numeric(10, 2) NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sitter_id" uuid NOT NULL,
	"owner_id" uuid NOT NULL,
	"rating" integer NOT NULL,
	"comment" text,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "sitters" (
	"id" uuid PRIMARY KEY NOT NULL,
	"bio" text,
	"experience_years" integer,
	"rating_avg" numeric(3, 2) DEFAULT '0',
	"rating_count" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"name" text NOT NULL,
	"role" "user_role" NOT NULL,
	"city" text,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listing_pet_types" ADD CONSTRAINT "listing_pet_types_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listings" ADD CONSTRAINT "listings_sitter_id_sitters_id_fk" FOREIGN KEY ("sitter_id") REFERENCES "public"."sitters"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_sitter_id_sitters_id_fk" FOREIGN KEY ("sitter_id") REFERENCES "public"."sitters"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sitters" ADD CONSTRAINT "sitters_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;