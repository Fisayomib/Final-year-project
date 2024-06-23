import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const Nav = () => (
  <nav className="p-4">
    <Link href="/">
      <div className="flex items-center gap-2">
        <ArrowLeft className="h-6 w-6" />
        <h3 className="text-xl font-medium">Acme Inc</h3>
      </div>
    </Link>
  </nav>
);
