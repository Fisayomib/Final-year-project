import Image from "next/image";
import Link from "next/link";
import { Nav } from "../../_components/nav";
// import { SignInForm } from "./_components/sign-in-form";
import { OAuthSignIn } from "../../_components/oauth-sign-in";

export default function SignInPage() {
  return (
    <div className="h-screen w-full lg:grid lg:grid-cols-2">
      <header className="fixed left-0 top-0">
        <Nav />
      </header>
      <div className="flex h-screen items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-pretty text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <OAuthSignIn />
          {/* <SignInForm /> */}
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden h-screen bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
