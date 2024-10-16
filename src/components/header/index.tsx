import { logo } from "@/assets/icons";
import { HelpCircle, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Image
          src={logo}
          alt="Havilah Learning Hub Logo"
          width={80}
          height={80}
        />
        <nav className="flex items-center space-x-4">
          <Link
            href="/about"
            className="hover:text-secondary transition-colors"
          >
            About Us
          </Link>
          <Link
            href="/services"
            className="hover:text-secondary transition-colors"
          >
            Services
          </Link>
          <Link
            href="/profile"
            className="hover:text-secondary transition-colors"
          >
            <User size={20} />
          </Link>
          <Link href="/help" className="hover:text-secondary transition-colors">
            <HelpCircle size={20} />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
