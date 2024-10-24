"use client";

import React, { useEffect, useState } from "react";
import { Home, Inbox, LucideSidebarClose, Users } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {};

const ProfileSidebar = (props: Props) => {
  const isMobile = useIsMobile();
  const pathname = usePathname();

  const items = [
    {
      title: "Personal Information",
      url: "/profile",
      icon: Home,
    },
    {
      title: "Activity Logs",
      url: "/profile/activity-logs",
      icon: Inbox,
    },
    {
      title: "Referrals",
      url: "/profile/referral",
      icon: Users,
    },
  ];

  if (!isMobile) {
    return (
      <main className="bg-white w-[300px] p-5 border-r min-h-screen">
        <h1 className="font-medium text-gray-500">Profile</h1>
        <div className="mt-10 flex flex-col gap-5">
          {items.map((item, index) => (
            <Link href={item.url} key={index}>
              <div
                className={cn(
                  "flex items-center space-x-2 py-2 px-4 hover:bg-primary-foreground rounded-lg hover:text-primary duration-300",
                  pathname === item.url
                    ? "bg-primary-foreground text-primary"
                    : ""
                )}
              >
                <item.icon />
                <span>{item.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    );
  }

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger>
          <LucideSidebarClose className="" />
        </SheetTrigger>

        <SheetContent>
          <h1 className="font-medium text-gray-500">Profile</h1>
          <div className="mt-10 flex flex-col gap-5">
            {items.map((item, index) => (
              <Link href={item.url} key={index}>
                <div
                  className={cn(
                    "flex items-center space-x-2 py-2 px-4 hover:bg-primary-foreground rounded-lg hover:text-primary duration-300",
                    pathname === item.url
                      ? "bg-primary-foreground text-primary"
                      : ""
                  )}
                >
                  <item.icon />
                  <span>{item.title}</span>
                </div>
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    );
  }
};

export default ProfileSidebar;
