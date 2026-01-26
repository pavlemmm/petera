"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { NavbarActions } from "./NavbarActions";
import { User, UserRole } from "@/db/types";

type Props = {
  user: User | null;
  role: UserRole | null;
};

export function MobileMenu({ user, role }: Props) {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Otvori meni">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-50 px-2">
        <SheetHeader>
          <SheetTitle>Meni</SheetTitle>
        </SheetHeader>


        <NavbarActions
          user={user}
          role={role}
          variant="mobile"
        />
      </SheetContent>
    </Sheet>
  );
}
