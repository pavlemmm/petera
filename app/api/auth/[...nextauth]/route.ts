import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { db } from "@/db/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

import { UserLoginSchema } from "@/lib/validations/userLogin";

import { comparePasswords } from "@/lib/passwordHasher";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const parsed = UserLoginSchema.safeParse(credentials);

        if (!parsed.success) return null;

        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, parsed.data.email))
          .limit(1);

        if (!user || !await comparePasswords(parsed.data.password, user.salt, user.passwordHash)) return null

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          lastName: user.lastName,
          role: user.role,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },

  pages: {
    signIn: "/prijava",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
