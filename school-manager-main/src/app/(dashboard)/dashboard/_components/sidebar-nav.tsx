import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  SheetTrigger,
  SheetContent,
  Sheet,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Home, Menu, Package2, Table, List } from "lucide-react";
import { MobileSidebarNavLink, SidebarNavLink } from "./sidebar-nav-link";

const config = [
  {
    name: "Dashboard",
    Icon: <Home className="h-4 w-4" />,
    link: "/dashboard",
  },
  {
    name: "Time Table",
    Icon: <Table className="h-4 w-4" />,
    link: "/dashboard/time-table",
  },
  {
    name: "Courses",
    Icon: <List className="h-4 w-4" />,
    link: "/dashboard/courses",
  },
];

export type Config = (typeof config)[number];

export const SidebarNav = () => {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">Acme Inc</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {config.map((c, index) => (
              <SidebarNavLink key={index} {...c} />
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export const MobileSideNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <SheetHeader>
          <SheetTitle>
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <nav className="grid gap-2 text-lg font-medium">
          {config.map((c, index) => (
            <MobileSidebarNavLink key={index} {...c} />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
