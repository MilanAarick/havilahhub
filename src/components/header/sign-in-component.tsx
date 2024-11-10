"use client";

import { useState, useEffect } from "react";
import { User } from "lucide-react";
import Link from "next/link";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useIsMobile } from "@/hooks/use-mobile";

export default function SignInComp() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  // Close accordion when switching to desktop view
  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  const AuthButtons = () => (
    <nav className="flex flex-col space-y-2">
      <Link href="/sign-up" className="w-full">
        <Button variant="outline" className="w-full justify-start">
          Sign Up
        </Button>
      </Link>
      <Link href="/sign-in" className="w-full">
        <Button variant="default" className="w-full justify-start">
          Sign In
        </Button>
      </Link>
    </nav>
  );

  if (isMobile) {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="auth-options">
          <AccordionTrigger
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-2 px-4 py-2"
          >
            Account
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-2">
            <AuthButtons />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:text-white hover:bg-secondary"
          aria-label="User menu"
        >
          <User className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2">
        <AuthButtons />
      </PopoverContent>
    </Popover>
  );
}
