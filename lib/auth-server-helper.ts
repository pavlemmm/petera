import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { UserRole } from "@/db/types";

export async function requireAuth(role?: UserRole) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || (role && session.user.role !== role)) {
    notFound();
  }

  return session;
}

export async function requireNoSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    // notFound();
    redirect('/oglasi')
  }
}
