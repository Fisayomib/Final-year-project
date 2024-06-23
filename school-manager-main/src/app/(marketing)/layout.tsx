import { Nav } from "./_components/nav";
import { getCachedUser } from "@/lib/queries/user";

export default async function MarketingLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const user = await getCachedUser();

  return (
    <main className="h-screen">
      <div className="fixed left-0 top-0 -z-10 h-full w-full">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>
      <div className="relative mx-auto flex h-screen w-full max-w-7xl flex-col px-6 md:px-8 lg:px-12">
        <header>
          <Nav user={user} />
        </header>
        {children}
      </div>
    </main>
  );
}
