"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { authClient } from "@/lib/auth-client";


export default function Navbar() {
  const { data: session } = authClient.useSession()

  return (
    <nav className="w-full bg-background shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          Petera
        </Link>

        {!session ? (
          <div>
            <Link href="/prijava">
              <Button className="mr-2">Prijavi se</Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline'>Registruj se</Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/vlasnik-registracija">Registruj se kao vlasnik</Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/cuvar-registracija">Registruj se kao čuvar</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div>
            <h2 className="mr-5 inline">{session.user.name}</h2>
            <Button variant="destructive" onClick={() => authClient.signOut()}>Odjavi se</Button>
          </div>
        )}
      </div>
    </nav>
  );
}
