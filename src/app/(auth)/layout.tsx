import { logo } from "@/assets/icons";
import Image from "next/image";
import React from "react";
import "../globals.css";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <main
      className={` font-inter antialiased min-h-screen flex items-center justify-center bg-white`}
    >
      <div className="">
        <div>
          <Image
            alt="logo"
            src={logo}
            height={150}
            width={150}
            objectFit="contain"
            className="mx-auto rounded-sm"
          />
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
