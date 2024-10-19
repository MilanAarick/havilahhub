"use client";

import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { User } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {};

const SignInComp = (props: Props) => {
  return (
    <main>
      <Popover>
        <PopoverTrigger>
          <User />
        </PopoverTrigger>
        <PopoverContent className="space-y-3">
          <Link href={"/sign-up"}>
            <Button>Sign Up</Button>
          </Link>
          <Link href={"/sign-in"}>
            <Button>Sign In</Button>
          </Link>
        </PopoverContent>
      </Popover>
    </main>
  );
};

export default SignInComp;
