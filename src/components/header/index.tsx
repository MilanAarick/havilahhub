import { logo } from "@/assets/icons";
import {
  HelpCircle,
  User,
  BookOpen,
  Gift,
  Menu,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import UserMenu from "./user-menu";
import SignInComp from "./sign-in-component";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import DropdownMenu from "./drop-down";

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md text-primary-foreground sticky top-0 z-50 text-black">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Image
          src={logo}
          alt="Havilah Learning Hub Logo"
          width={80}
          height={80}
        />

        <nav className="hidden md:flex items-center space-x-4 text-black">
          <SignedIn>
            <Link
              href="/home"
              className="hover:text-secondary transition-colors"
            >
              Home
            </Link>
          </SignedIn>
          <SignedOut>
            <Link href="/" className="hover:text-secondary transition-colors">
              Home
            </Link>
          </SignedOut>

          <Link
            href="/about"
            className="hover:text-secondary transition-colors"
          >
            About
          </Link>
          <SignedIn>
            <Link
              href="/services"
              className="hover:text-secondary transition-colors"
            >
              Services
            </Link>
            {/* <DropdownMenu
              title="Services"
              items={[
                { label: "Writers", href: "/services/writers" },
                { label: "Tutors", href: "/services/tutors" },
              ]}
            /> */}
            <Link
              href="/games"
              className="hover:text-secondary transition-colors"
            >
              Games
            </Link>
            <DropdownMenu
              title="Content Library"
              items={[
                { label: "Curriculum", href: "/content-library/curriculum" },
                { label: "Tests", href: "/content-library/tests" },
              ]}
            />
          </SignedIn>
          <SignedIn>
            <UserMenu />
          </SignedIn>
          <SignedOut>
            <SignInComp />
          </SignedOut>
          <SignedIn>
            <Link
              href="/referral"
              className="hover:text-secondary transition-colors hover:rotate-12"
            >
              <Gift size={20} />
            </Link>
          </SignedIn>

          <Link
            href="/help"
            className="hover:text-secondary transition-colors hover:rotate-12"
          >
            <HelpCircle size={20} />
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>
                Navigate through Havilah Learning Hub
              </SheetDescription>
            </SheetHeader>
            <div className="mt-4 space-y-4">
              <Link href="/" className="block py-2">
                Home
              </Link>
              <Link href="/about" className="block py-2">
                About
              </Link>
              <SignedIn>
                <Accordion type="single" collapsible>
                  <AccordionItem value="services">
                    <AccordionTrigger>Services</AccordionTrigger>
                    <AccordionContent>
                      <Link
                        href="/services?filter=writing"
                        className="block py-2"
                      >
                        Writers
                      </Link>
                      <Link
                        href="/services?filter=tutoring"
                        className="block py-2"
                      >
                        Tutors
                      </Link>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="content-library">
                    <AccordionTrigger>Content Library</AccordionTrigger>
                    <AccordionContent>
                      <Link
                        href="/content-library/curriculum"
                        className="block py-2"
                      >
                        Curriculum
                      </Link>
                      <Link
                        href="/content-library/tests"
                        className="block py-2"
                      >
                        Tests
                      </Link>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Link href="/games" className="block py-2">
                  Games
                </Link>
                <Link href="/referral" className="block py-2">
                  Referral
                </Link>
              </SignedIn>
              <Link href="/help" className="block py-2">
                Help
              </Link>
              <SignedIn>
                <UserMenu />
              </SignedIn>
              <SignedOut>
                <SignInComp />
              </SignedOut>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
