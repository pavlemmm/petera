import NextAuth from "next-auth";

import { UserRole } from "@/db/types";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      lastName: string;
      role: UserRole;
    };
  }

  interface User {
    id: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}
