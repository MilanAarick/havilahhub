import { Facebook, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="flex gap-3 items-center">
          <div>
            <p className="text-sm">
              &copy; 2023 Havilah Learning Hub. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            <Link href="#" aria-label="Facebook">
              <Facebook size={20} className="text-black" />
            </Link>
            <Link href="#" aria-label="Instagram">
              <Instagram size={20} className="text-black" />
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <Linkedin size={20} className="text-black" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
          <Link
            href={"#"}
            className="hover:font-semibold hover:text-black duration-200"
          >
            Privacy
          </Link>
          <Link
            href={"#"}
            className="hover:font-semibold hover:text-black duration-200"
          >
            Terms of Use
          </Link>
          <Link
            href={"#"}
            className="hover:font-semibold hover:text-black duration-200"
          >
            Legal Disclosure
          </Link>
          <Link
            href={"#"}
            className="hover:font-semibold hover:text-black duration-200"
          >
            Copyright
          </Link>
          <Link
            href={"#"}
            className="hover:font-semibold hover:text-black duration-200"
          >
            Trademark
          </Link>
          <Link
            href={"#"}
            className="hover:font-semibold hover:text-black duration-200"
          >
            Newsletter
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
