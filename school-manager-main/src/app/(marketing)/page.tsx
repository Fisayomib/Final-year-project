import Link from "next/link";

import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";

export default async function Home() {
  return (
    <section className="flex h-full justify-center pt-[150px]">
      <div className="relative mx-auto flex max-w-2xl flex-col items-center">
        <h2 className="text-center text-3xl font-bold text-gray-900 sm:text-6xl dark:text-gray-50">
          Empower Your Academic Journey
        </h2>
        <p className="mt-6 text-center text-lg leading-6 text-gray-600 dark:text-gray-200">
          Seamlessly manage your courses, track your progress, and stay
          organized with our intuitive university management system.
        </p>
        <Button className="mt-4" asChild>
          <Link href={"/dashboard"}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <p>Go to dashboard</p>
          </Link>
        </Button>
      </div>
    </section>
  );
}
