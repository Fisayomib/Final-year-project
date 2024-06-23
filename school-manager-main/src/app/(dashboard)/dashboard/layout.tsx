import { MobileSideNav, SidebarNav } from "./_components/sidebar-nav";
import { Profile } from "../../_components/profile";
import { ChatBot } from "./_components/chat-bot";
import { getCachedUser } from "@/lib/queries/user";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCachedUser();
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <SidebarNav />
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <MobileSideNav />
          <div className="ml-auto flex items-center gap-2">
            {user && <p>{user.emailAddresses[0]?.emailAddress}</p>}
            <Profile />
          </div>
        </header>
        {children}
      </div>
      <ChatBot />
    </div>
  );
}
