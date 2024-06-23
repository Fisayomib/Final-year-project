import Link from "next/link";
import { Package2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { User } from "@clerk/nextjs/server";

interface NavProps {
  user: User | null;
}

export const Nav = ({ user }: NavProps) => {
  return (
    <nav className="container flex h-20 items-center justify-between font-medium">
      <Link
        href="/"
        className="flex items-center gap-2 text-lg font-semibold md:text-base"
      >
        <Package2 className="h-6 w-6" />
        <p className="text-lg">Acme Inc</p>
        <span className="sr-only">Acme Inc</span>
      </Link>
      {user ? (
        <Button asChild>
          <Link href={"/dashboard"}>Go to Dashboard</Link>
        </Button>
      ) : (
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button variant={"secondary"} asChild>
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </div>
      )}
    </nav>
  );
};
