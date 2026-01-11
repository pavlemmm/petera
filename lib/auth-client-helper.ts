"use client"

import { authClient } from "@/lib/auth-client";
import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";
import { UserRole } from "@/db/types";

export function requireAuth(role?: UserRole) {
  const { data } = authClient.useSession()
  const session = data?.session ?? null
  const user = data?.user ?? null

  if (!session || (role && user!.role !== role)) {
    notFound();
  }

  return user;
}

export function requireNoSession() {
  const { data } = authClient.useSession()
  const session = data?.session ?? null


  if (session) {
    useRouter().push("/oglasi");
  }
}

export function getSession() {
  const { data } = authClient.useSession()
  const session = data?.session ?? null
  const user = data?.user ?? null
  return { session, user, role: user?.role };
}

export function signOut() {
  authClient.signOut()
}
