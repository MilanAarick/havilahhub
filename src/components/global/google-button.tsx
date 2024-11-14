"use client";

import { Google } from "@/assets/icons/google";
import { Button } from "@/components/ui/button";
import { useGoogleAuth } from "@/hooks/authentication";

type Props = {
  method: "signUp" | "signIn";
  id?: string;
};

const GoogleAuthButton = ({ method, id }: Props) => {
  const { signInWith, signUpWith } = useGoogleAuth();

  return (
    <Button
      {...(method === "signIn"
        ? { onClick: () => signInWith("oauth_google", id) }
        : { onClick: () => signUpWith("oauth_google") })}
      className="w-full rounded-2xl flex gap-3 hover:bg-primary/80 hover:text-white"
      variant="outline"
    >
      <Google className="w-6 h-6" /> Google
    </Button>
  );
};

export default GoogleAuthButton;
