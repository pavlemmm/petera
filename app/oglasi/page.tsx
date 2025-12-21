"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function OglasiPage() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h1>Oglasi</h1>
      <p>Ulogovan kao {session?.user.email}</p>
    </div>
  )
}

