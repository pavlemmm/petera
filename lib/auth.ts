import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/db"; // your drizzle instance
import { account, session, user, verification } from "@/db/schema";
import { UserRole } from "@/db/types";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),

  user: {
    additionalFields: {
      role: {
        type: [UserRole.OWNER, UserRole.SITTER],
        required: true,
        defaultValue: UserRole.OWNER,
        input: false, // don't allow user to set role
      }
    }
  },

  emailAndPassword: {
    enabled: true,
  },
});
