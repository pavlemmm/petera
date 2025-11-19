import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
    return (
        <nav className="w-full bg-white/10 shadow-2xl">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold">
                    Petera
                </Link>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='default'>Prijavi se</Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem asChild>
                            <Link href="/login/vlasnik">Prijavi se kao vlasnik</Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                            <Link href="/login/cuvar">Prijavi se kao čuvar</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    );
}
