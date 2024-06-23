"use client";

import * as React from "react";
import { useSignIn } from "@clerk/nextjs";
import { type OAuthStrategy } from "@clerk/types";

import { Button } from "@/components/ui/button";
import { FaGoogle, FaGithub } from "react-icons/fa";
import type { IconType } from "react-icons/lib";
import { showErrorToast } from "@/lib/handle-error";
import { Loader } from "lucide-react";

const oauthProviders = [
  { name: "Google", strategy: "oauth_google", Icon: FaGoogle },
  { name: "Github", strategy: "oauth_github", Icon: FaGithub },
] satisfies {
  name: string;
  Icon: IconType;
  strategy: OAuthStrategy;
}[];

export function OAuthSignIn() {
  const [loading, setLoading] = React.useState<OAuthStrategy | null>(null);
  const { signIn, isLoaded: signInLoaded } = useSignIn();

  async function oauthSignIn(provider: OAuthStrategy) {
    if (!signInLoaded) return null;

    try {
      setLoading(provider);
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (err) {
      setLoading(null);
      showErrorToast(err);
    }
  }

  return (
    <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
      {oauthProviders.map(({ strategy, Icon, name }) => {
        return (
          <Button
            key={strategy}
            variant="outline"
            className="w-full bg-background"
            onClick={() => void oauthSignIn(strategy)}
            disabled={loading !== null}
          >
            {loading === strategy ? (
              <Loader className="mr-2 size-4 animate-spin" aria-hidden="true" />
            ) : (
              <Icon className="mr-2 size-4" aria-hidden="true" />
            )}
            {name}
            <span className="sr-only">{name}</span>
          </Button>
        );
      })}
    </div>
  );
}
