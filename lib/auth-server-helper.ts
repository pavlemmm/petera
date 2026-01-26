import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { UserRole } from "@/db/types";

export enum AuthMode {
  REQUIRED,
  GUEST,
}

export async function requireAuth(
  mode: AuthMode = AuthMode.REQUIRED,
  reqRole?: UserRole,
) {
  const data = await auth.api.getSession({
    headers: await headers(),
  });

  const session = data?.session;
  const user = data?.user;

  const isLoggedIn = !!(session && user);
  const hasRole = !reqRole || user?.role === reqRole;

  if (mode === AuthMode.REQUIRED && (!isLoggedIn || !hasRole)) {
    notFound();
  }

  if (mode === AuthMode.GUEST && isLoggedIn && !hasRole) {
    notFound();
  }

  return {
    session,
    user,
    role: user?.role,
    isLoggedIn,
  };
}
