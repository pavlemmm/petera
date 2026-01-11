CREATE TYPE "public"."city" AS ENUM('BEOGRAD', 'NOVI_SAD', 'NIS', 'KRAGUJEVAC', 'SUBOTICA');--> statement-breakpoint
CREATE TABLE "listing_image" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"listing_id" uuid NOT NULL,
	"image" "bytea" NOT NULL,
	"mime_type" text NOT NULL,
	"order" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "listing" ALTER COLUMN "city" SET DATA TYPE "public"."city" USING "city"::"public"."city";--> statement-breakpoint
ALTER TABLE "listing_image" ADD CONSTRAINT "listing_image_listing_id_listing_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listing"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "image";