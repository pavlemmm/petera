import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { UserRole } from "@/db/types";

export async function requireAuth(role?: UserRole) {
  const data = await auth.api.getSession({
    headers: await headers(),
  });
  const session = data?.session
  const user = data?.user

  if (!session || !user || (role && user.role !== role)) {
    notFound();
  }

  return { session, user, role: user.role };
}

export async function requireNoSession() {
  const data = await auth.api.getSession({
    headers: await headers(),
  });
  const session = data?.session

  if (session) {
    // notFound();
    redirect("/oglasi");
  }
}
