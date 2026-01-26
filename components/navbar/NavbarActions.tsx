"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { User, UserRole, UserRoleType } from "@/db/types";
import { signOut } from "@/lib/auth-client-helper";

interface Props {
  user: User | null;
  role: UserRoleType | null;
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
};

export function NavbarActions({
  user,
  role,
  variant = "desktop",
}: Props) {
  const isMobile = variant === "mobile";

  if (!user) {
    // GUEST
    return (
      <div className={isMobile ? "flex flex-col gap-2" : "flex items-center gap-3"}>

        <Link href="/">
          <Button className={isMobile ? "w-full gap-2" : "gap-2"} variant="outline">
            Oglasi
          </Button>
        </Link>

        <Link href="/info">
          <Button className={isMobile ? "w-full gap-2" : "gap-2"} variant="outline">
            Više o platformi
          </Button>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Registrujte se</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Link href="/vlasnik-registracija">Registrujte se kao vlasnik</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/cuvar-registracija">Registrujte se kao čuvar</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Link href="/prijava">
          <Button className={isMobile ? "w-full gap-2" : ""}>Prijavite se</Button>
        </Link>

      </div>
    );
  }

  // AUTH
  return (
    <div className={isMobile ? "flex flex-col gap-2" : "flex items-center gap-3"}>
      <Link href="/">
        <Button className={isMobile ? "w-full gap-2" : "gap-2"}>
          Oglasi
        </Button>
      </Link>

      {role === UserRole.SITTER && (
        <Link href="/postavi">
          <Button className={isMobile ? "w-full gap-2" : "gap-2"}>
            <span className="text-xl leading-none">+</span>
            Postavite oglas
          </Button>
        </Link>
      )}

      <Link href="/rezervacije">
        <Button className={isMobile ? "w-full gap-2" : "gap-2"}>
          Rezervacije
        </Button>
      </Link>

      <Link href="/info">
        <Button className={isMobile ? "w-full gap-2" : "gap-2"}>
          Više o platformi
        </Button>
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{user?.name}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Button variant="ghost" className="w-full mb-1">
              Uredi profil
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Button variant="ghost" className="text-red-400 w-full" onClick={() => signOut()}>
              Odjavite se
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

    </div>
  );
}
