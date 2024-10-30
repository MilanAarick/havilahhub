import { facebook, instagram, linkedin, youtube } from "@/assets/icons";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import Image from "next/image";
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
          <div className="flex items-end space-x-4">
            <Link
              href="https://www.facebook.com/share/KRAptGMmnBtNiXMd/?mibextid=qi2Omg"
              target="_blank"
              aria-label="Facebook"
            >
              <Image src={facebook} alt="Facebook" width={32} height={32} />
            </Link>
            <Link
              href="https://www.instagram.com/havilah_tutors/profilecard/?igsh=aTF6eDY2NDY4M3F2"
              target="_blank"
              aria-label="Instagram"
            >
              <Image src={instagram} alt="Facebook" width={32} height={32} />
            </Link>
            <Link
              href="https://www.linkedin.com/company/havilahtutors/"
              target="_blank"
              aria-label="LinkedIn"
            >
              <Image src={linkedin} alt="Facebook" width={32} height={32} />
            </Link>
            <Link
              href="https://youtube.com/@havilahlearnonghub?si=bF_amnZpdWflsDPV"
              target="_blank"
              aria-label="LinkedIn"
            >
              <Image src={youtube} alt="Facebook" width={32} height={32} />
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
