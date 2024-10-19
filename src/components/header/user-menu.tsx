"use client";

import { SignOutButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

type Props = {};

const UserMenu = ({}: Props) => {
  return (
    <div>
      <UserButton
        userProfileUrl="/profile"
        appearance={{
          elements: { userButtonPopoverCard: { pointerEvents: "initial" } },
        }}
      />
    </div>
  );
};

export default UserMenu;
