"use client";
import Link from "next/link";
import type { Config } from "./sidebar-nav";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// interface SidebarNavLinkProps {

// }

export const SidebarNavLink = ({ Icon, link, name }: Config) => {
  const pathname = usePathname();

  return (
    <Link
      href={link}
      className={cn(
        "text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
        pathname === link ? "bg-secondary text-secondary-foreground" : "",
      )}
    >
      {Icon}
      {name}
    </Link>
  );
};

export const MobileSidebarNavLink = ({ Icon, link, name }: Config) => {
  const pathname = usePathname();

  return (
    <Link
      href={link}
      className={cn(
        "text-muted-foreground hover:text-foreground mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2",
        pathname === link ? "bg-secondary text-red=200" : "",
      )}
    >
      {Icon}
      {name}
    </Link>
  );
};
