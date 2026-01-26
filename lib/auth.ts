import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/db/db";
import { sitter } from "@/db/schema";

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
        input: true,
      },
      phone: {
        type: "string",
        required: true,
        input: true,
      },
    }
  },

  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          if (user.role === UserRole.SITTER) {
            await db.insert(sitter).values({ id: user.id })
          }
        }
      }
    }
  },

  emailAndPassword: {
    enabled: true,
  },
});
