import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

import { Loader } from "lucide-react";

export default function SSOCallbackPage() {
  return (
    <section className="container flex h-screen w-full items-center justify-center">
      <Loader className="size-16 animate-spin" aria-hidden="true" />
      <h1>Authenticating User</h1>
      <AuthenticateWithRedirectCallback />
    </section>
  );
}
