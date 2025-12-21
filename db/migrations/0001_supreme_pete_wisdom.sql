ALTER TABLE "users" ADD COLUMN "salt" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "last_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "sitters" DROP COLUMN "experience_years";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "city";