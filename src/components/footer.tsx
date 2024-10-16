import { Facebook, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container mx-auto px-4 py-8 flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <div>
            <p className="text-sm">
              &copy; 2023 Havilah Learning Hub. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            <Link href="#" aria-label="Facebook">
              <Facebook
                size={20}
                className="text-primary hover:text-primary/80"
              />
            </Link>
            <Link href="#" aria-label="Instagram">
              <Instagram
                size={20}
                className="text-primary hover:text-primary/80"
              />
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <Linkedin
                size={20}
                className="text-primary hover:text-primary/80"
              />
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
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
