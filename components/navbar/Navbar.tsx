"use client";

import Link from "next/link";
import { NavbarActions } from "./NavbarActions";
import { MobileMenu } from "./MobileMenu";

import { getSession } from "@/lib/auth-client-helper";

export default function Navbar() {
  const { user, role } = getSession();

  return (
    <nav className="w-full bg-background shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          Petera
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center">
          <NavbarActions user={user} role={role} />
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <MobileMenu user={user} role={role} />
        </div>
      </div>
    </nav>
  );
}
