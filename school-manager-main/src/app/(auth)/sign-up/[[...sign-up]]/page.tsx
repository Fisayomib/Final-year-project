import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Nav } from "../../_components/nav";
// import { SignUpForm } from "./_components/sign-up-form";
import { OAuthSignIn } from "../../_components/oauth-sign-in";

export default function SignUpPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <header className="fixed left-0 top-0">
        <Nav />
      </header>
      <Card className="mx-6 w-full max-w-sm sm:mx-auto">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OAuthSignIn />

          {/* <p className="my-4 text-center text-xs text-secondary-foreground">
            OR CONTINUE WITH
          </p> */}
          {/* <SignUpForm /> */}
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/sign-in" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
