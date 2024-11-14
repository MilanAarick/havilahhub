"use client";

import FacebookIcon from "@/assets/icons/facebook";
import { Button } from "@/components/ui/button";
import { useGoogleAuth } from "@/hooks/authentication";

type Props = {
  method: "signUp" | "signIn";
  id?: string;
};

const FacebookAuthButton = ({ method, id }: Props) => {
  const { signInWith, signUpWith } = useGoogleAuth();

  return (
    <Button
      {...(method === "signIn"
        ? { onClick: () => signInWith("oauth_facebook", id) }
        : { onClick: () => signUpWith("oauth_facebook") })}
      className="w-full rounded-2xl flex gap-3 hover:bg-primary/80 hover:text-white"
      variant="outline"
    >
      <FacebookIcon className="w-6 h-6" /> Facebook
    </Button>
  );
};

export default FacebookAuthButton;
